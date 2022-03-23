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

export const Analytics = {
  hasStarted: false,
  _paq: undefined,
  _searchCount: false,
  setEnabled: (enabled) => {
    DEV && console.log('setting tracking permission to', enabled)
    Analytics._paq?.push(['setDoNotTrack', !enabled])
    return Analytics
  },
  trackPage: () => {
    Analytics._paq?.push(['trackPageView'])
    return Analytics
  },
  trackSearch: ({ keyword, category = false, searchCount = false }) => {
    Analytics._paq?.push(['trackSiteSearch', keyword, category, searchCount])
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
  trackPageFromRoute: (path) => {
    // Defer tracking so that document.title has been updated to new
    // Set document title manually only when route change is called.
    // Initial tracking uses title from server html
    defer(() => {
      DEV && console.log('track from router', document.title)
      Analytics._paq?.push(['setDocumentTitle', document.title])
      Analytics.trackPageOrSearch(path)
    })
  },
  connect: () => {
    DEV && console.log('connect analytics to router')
    Router.events.on('routeChangeComplete', Analytics.trackPageFromRoute)
    return Analytics
  },
  disconnect: () => {
    DEV && console.log('disconnect analytics to router')
    Router.events.off('routeChangeComplete', Analytics.trackPageFromRoute)
    return Analytics
  },
  init: ({ enabled = false, url, siteId }) => {
    // init only once

    if (Analytics.hasStarted) {
      console.log('started already')
      return Analytics
    }

    Analytics._paq = window._paq = window._paq || []
    Analytics.setEnabled(enabled)
    // // Don't send anything in dev mode. just log it instead
    if (process.env.NODE_ENV === 'development') {
      Analytics._paq.push = console.log
    }

    if (Analytics.hasStarted) {
      console.log('started already')
      return Analytics
    }

    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */

    Analytics._paq.push(['disableCookies'])
    Analytics._paq.push(['enableLinkTracking'])
    ;(function () {
      var u = url
      Analytics._paq.push(['setTrackerUrl', u + 'tracker.php'])
      Analytics._paq.push(['setSiteId', siteId])
      var d = document,
        g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0]
      g.type = 'text/javascript'
      g.async = true
      g.src = u + 'piwik.min.js'
      s.parentNode.insertBefore(g, s)
    })()

    /**And here we are back to our implementation */
    DEV && console.log('initial page track')
    // Analytics._paq = window._paq
    Analytics.trackPageOrSearch(window.location.pathname)

    return Analytics
  },
}

const useAnalytics = () => {
  const isAnalyticsAllowed = useAtomValue(cookieConsentAtom)
  const isCookieConsentSet = useAtomValue(isCookieConsentSetAtom)
  const searchCount = useAtomValue(searchResultsCountAtom)
  // Initialize analytics
  useEffect(() => {
    //but not in server side render cycles
    if (isSSR()) {
      return
    }
    DEV && console.log('init tracker')

    const { MATOMO_URL: url, MATOMO_SITE_ID: siteId } =
      getConfig().publicRuntimeConfig

    Analytics.init({
      url,
      siteId,
      enabled: navigator.doNotTrack !== '1' && !!isAnalyticsAllowed,
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
      DEV && console.log('analytics consent is not yet acknowledged')
      return
    }
    DEV &&
      console.log(
        'set analytics allowed from useEffect when consent changes',
        isAnalyticsAllowed
      )
    Analytics.setEnabled(isAnalyticsAllowed)
  }, [isCookieConsentSet, isAnalyticsAllowed])

  return Analytics
}
export default useAnalytics
