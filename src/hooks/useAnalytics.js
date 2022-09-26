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
import defer from 'lodash/defer'
import { SEARCH_PAGE } from './useSearchRoute'
const DEV = process.env.NODE_ENV === 'development'

export const Analytics = {
  hasStarted: false,
  enabled: false,
  _searchCount: false,
  setEnabled: (enabled) => {
    DEV && console.log('setting tracking permission to', enabled)
    Analytics.enabled = enabled
    return Analytics
  },
  trackPage: () => {
    window._paq.push(['trackPageView'])
    return Analytics
  },
  trackSearch: ({ keyword, category = false, searchCount = false, _paq }) => {
    _paq.push(['trackSiteSearch', keyword, category, searchCount])
    return Analytics
  },
  trackPageOrSearch: (path, _paq) => {
    // if (Analytics.enabled !== true) {
    //   // DEV && console.log('Tracking not allowed by user')
    //   // return Analytics
    // }

    if (new RegExp(`${SEARCH_PAGE}`).test(path)) {
      Analytics.trackSearch({
        keyword: new URLSearchParams(window.location.search).get('search'),
        category: false,
        searchCount: Analytics._searchCount,
        _paq,
      })
    } else {
      Analytics.trackPage()
    }
    return Analytics
  },
  init: ({ enabled = false, url, siteId }) => {
    window._paq = window._paq || []

    // // // // Don't send anything in dev mode. just log it instead
    if (process.env.NODE_ENV === 'development') {
      window._paq.push = console.log
    }

    Analytics.setEnabled(enabled)

    if (Analytics.hasStarted) {
      DEV && console.log('started already')
      return Analytics
    }
    window._paq.push(['requireCookieConsent'])
    window._paq.push(['enableLinkTracking'])
    ;(function () {
      var u = url
      window._paq.push(['setTrackerUrl', u + 'tracker.php'])
      window._paq.push(['setSiteId', siteId])
      var d = document,
        g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0]
      g.type = 'text/javascript'
      g.async = true
      g.src = u + 'piwik.min.js'
      s.parentNode.insertBefore(g, s)
    })()

    DEV && console.log('initial page track')
    if (enabled === true) {
      window._paq.push(['setCookieConsentGiven'])
    }
    Analytics.trackPageOrSearch(window.location.pathname, window._paq)
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
      // DEV && console.log('analytics consent is not yet acknowledged')
      return
    }
    var _paq = (window._paq = window._paq || [])
    // Don't send anything in dev mode. just log it instead
    if (DEV) {
      _paq.push = console.log
    }

    Analytics.init({
      url,
      siteId,
      enabled: navigator.doNotTrack !== '1' && isAnalyticsAllowed,
      searchCount,
    })

    const setTitleAndTrack = (path) => {
      defer(() => {
        DEV && console.log('tracking from router', path)
        window._paq.push(['requireCookieConsent'])
        if (Analytics.enabled === true) {
          window._paq.push(['setCookieConsentGiven'])
        }
        window._paq.push(['setCustomUrl', path])
        window._paq.push(['setDocumentTitle', document.title])
        Analytics.trackPageOrSearch(path, window._paq)
      })
    }

    router.events.on('routeChangeComplete', setTitleAndTrack)

    return () => {
      router.events.off('routeChangeComplete', setTitleAndTrack)
    }

    // DEV &&
    //   console.log(
    //     'set analytics allowed from useEffect when consent changes',
    //     isAnalyticsAllowed
    //   )
  }, [isCookieConsentSet, isAnalyticsAllowed, searchCount, router])

  return Analytics
}
export default useAnalytics
