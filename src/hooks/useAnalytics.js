import { Router } from 'next/router'
import { useEffect } from 'react'
import { useAtomValue } from 'jotai/utils'
import getConfig from 'next/config'
import {
  cookieConsentAtom,
  isCookieConsentSetAtom,
  searchResultsCountAtom,
} from '../store'
import { isSSR } from './useIsomorphicLayoutEffect'
import { defer } from 'lodash'
import { SEARCH_PAGE } from './useSearchRoute'
const DEV = process.env.NODE_ENV === 'development'

function initAnalyticsTracking({ enabled = false, url, siteId, domains }) {
  // init only once
  if (Analytics._paq) {
    return Analytics
  }

  var _paq = (window._paq = window._paq || [])

  // Don't send anything in dev mode. just log it instead
  if (process.env.NODE_ENV === 'development') {
    _paq.push = console.log
  }

  //** This part we get from the matomo instance */

  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  // _paq.push(['setDomains', ['*.www.infofinland.fi', '*.www.infofinland.fi']])
  _paq.push(['setDomains', [domains]])
  _paq.push(['setDoNotTrack', !enabled])
  DEV && console.log('initial page track')
  //Comment this out from matomo code. Initial page tracking is done
  // afterwards to ensure search is tracked properly as well
  // _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking'])
  ;(function () {
    var u = url
    _paq.push(['setTrackerUrl', u + 'tracker.php'])
    _paq.push(['setSiteId', siteId])
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.type = 'text/javascript'
    g.async = true
    g.src = u + 'piwik.min.js'
    s.parentNode.insertBefore(g, s)
  })()

  /**And here we are back to our implementation */
  Analytics._paq = window._paq
  Analytics.trackPageOrSearch(window.location.pathname)

  return Analytics
}

export const Analytics = {
  _paq: undefined,
  _searchCount: false,
  init: initAnalyticsTracking,
  setEnabled: (enabled) => {
    Analytics._paq.push(['setDoNotTrack', !enabled])
    return Analytics
  },
  trackPage: () => {
    Analytics._paq.push(['trackPageView'])
    return Analytics
  },
  trackSearch: ({ keyword, category = false, searchCount = false }) => {
    Analytics._paq.push(['tracSiteSearch', keyword, category, searchCount])
    return Analytics
  },
  trackPageOrSearch: (path) => {
    if (new RegExp(`${SEARCH_PAGE}`).test(path)) {
      Analytics.trackSearch({
        keyword: new URLSearchParams(window.location.search).get('search'),
        category: false,
        searchCount: Analytics._searchCount,
      })
    } else {
      Analytics.trackPage(path)
    }
    return Analytics
  },

  connect: () => {
    DEV && console.log('connect analytics to router')
    Router.events.on('routeChangeComplete', trackPageFromRoute)
    return Analytics
  },
  disconnect: () => {
    DEV && console.log('disconnect analytics to router')
    Router.events.off('routeChangeComplete', trackPageFromRoute)
    return Analytics
  },
}

const trackPageFromRoute = (path) => {
  // Defer tracking so that document.title has been updated to new
  // Set document title manually only when route change is called.
  // Initial tracking uses title from server html
  defer(() => {
    DEV && console.log('track from router', document.title)
    Analytics._paq.push(['setDocumentTitle', document.title])
    Analytics.trackPageOrSearch(path)
  })
}

const useAnalytics = () => {
  const isAnalyticsAllowed = useAtomValue(cookieConsentAtom)
  const isCookieConsentSet = useAtomValue(isCookieConsentSetAtom)
  const searchCount = useAtomValue(searchResultsCountAtom)
  // Initialize analytics
  useEffect(() => {
    if (isSSR()) {
      return
    }
    DEV && console.log('init tracker')
    const {
      MATOMO_URL: url,
      MATOMO_SITE_ID: siteId,
      MATOMO_DOMAINS: domains,
    } = getConfig().publicRuntimeConfig

    Analytics.init({
      url,
      siteId,
      domains,
      //type conversion for potential undefined value
      enabled: !!isAnalyticsAllowed,
      searchCount,
    }).connect()

    return () => Analytics.disconnect()
    // Only run this once, no variables are being passed here.
    // Only use first value of isAnalyticsAllowed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Set enabled if already enabled by user, and when value changes
  useEffect(() => {
    if (isSSR() || !isCookieConsentSet) {
      return
    }
    DEV && console.log('set analytics allowed', isAnalyticsAllowed)
    Analytics.setEnabled(isAnalyticsAllowed)
  }, [isCookieConsentSet, isAnalyticsAllowed])

  return Analytics
}
export default useAnalytics
