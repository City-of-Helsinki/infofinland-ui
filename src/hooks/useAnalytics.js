import { useRouter } from 'next/router'
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
// const DEV = process.env.NODE_ENV === 'development'
const DEV = true

export const Analytics = {
  hasStarted: false,
  _paq: undefined,
  _searchCount: false,
  setEnabled: (enabled) => {
    DEV && console.log('setting tracking permission to', enabled)
    Analytics.enabled = enabled
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
    if (Analytics.enabled !== true) {
      DEV && console.log('Tracking not allowed by user')
      return Analytics
    }

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
  // connect: () => {
  //   DEV && console.log('connect analytics to router')
  //   Router.events.on('routeChangeComplete', Analytics.trackPageFromRoute)
  //   return Analytics
  // },
  // disconnect: () => {
  //   DEV && console.log('disconnect analytics to router')
  //   Router.events.off('routeChangeComplete', Analytics.trackPageFromRoute)
  //   return Analytics
  // },
  init: ({ enabled = false, url, siteId }) => {
    Analytics._paq = window._paq = window._paq || []
    Analytics.setEnabled(enabled)
    if (Analytics.hasStarted) {
      DEV && console.log('started already')
      return Analytics
    }

    // // // Don't send anything in dev mode. just log it instead
    // if (process.env.NODE_ENV === 'development') {
    //   Analytics._paq.push = console.log
    // }

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

    DEV && console.log('initial page track')
    Analytics.trackPageOrSearch(window.location.pathname)
    Analytics.hasStarted = true
    return Analytics
  },
}

const useAnalytics = () => {
  const isAnalyticsAllowed = useAtomValue(cookieConsentAtom)
  const isCookieConsentSet = useAtomValue(isCookieConsentSetAtom)
  const searchCount = useAtomValue(searchResultsCountAtom)
  const router = useRouter()

  useEffect(() => {
    const { MATOMO_URL: url, MATOMO_SITE_ID: siteId } =
      getConfig().publicRuntimeConfig
    //Do not do anything until user has acknowledged the tracking rules
    if (isSSR() || !isCookieConsentSet) {
      DEV && console.log('analytics consent is not yet acknowledged')
      return
    }

    Analytics.init({
      url,
      siteId,
      enabled: navigator.doNotTrack !== '1' && isAnalyticsAllowed,
      searchCount,
    })

    router.events.on('routeChangeComplete', Analytics.trackPageFromRoute)

    return () => {
      router.events.off('routeChangeComplete', Analytics.trackPageFromRoute)
    }

    // DEV &&
    //   console.log(
    //     'set analytics allowed from useEffect when consent changes',
    //     isAnalyticsAllowed
    //   )

  }, [isCookieConsentSet, isAnalyticsAllowed, searchCount,router])

  return Analytics
}
export default useAnalytics
