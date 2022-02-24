import { Router } from 'next/router'
import { useEffect } from 'react'
import { useAtomValue } from 'jotai/utils'
import getConfig from 'next/config'
import { cookieConsentAtom, isCookieConsentSetAtom } from '../store'
import { isSSR } from './useIsomorphicLayoutEffect'
function initAnalyticsTracking({ enabled }) {
  // init only once
  if (Analytics._paq) {
    return Analytics
  }

  var _paq = (window._paq = window._paq || [])

  // Don't send anything in dev mode. just log it instead
  if (process.env.NODE_ENV === 'development') {
    _paq.push = console.log
  }
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['setDomains', ['*.www.infofinland.fi', '*.www.infofinland.fi']])
  _paq.push(['setDoNotTrack', !enabled])
  // _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking'])
  ;(function () {
    var u = '//webanalytics.digiaiiris.com/js/'
    _paq.push(['setTrackerUrl', u + 'tracker.php'])
    _paq.push(['setSiteId', '628'])
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.type = 'text/javascript'
    g.async = true
    g.src = u + 'piwik.min.js'
    s.parentNode.insertBefore(g, s)
  })()

  Analytics._paq = window._paq
  console.log('initial page track')
  Analytics.trackPage()

  return Analytics
}

export const Analytics = {
  _paq: undefined,
  init: initAnalyticsTracking,
  setEnabled: (enabled) => {
    Analytics._paq.push(['setDoNotTrack', !enabled])
    return Analytics
  },
  trackPage: () => {
    // alert('change title first')
    Analytics._paq.push(['trackPageView'])
    return Analytics
  },
  connect: () => {
    console.log('connect analytics to router')
    Router.events.on('routeChangeComplete', trackPageFromRoute)
    return Analytics
  },
  disconnect: () => {
    console.log('disconnect analytics to router')
    Router.events.off('routeChangeComplete', trackPageFromRoute)
    return Analytics
  },
}

const trackPageFromRoute = () => {
  console.log('track from router')
  Analytics.trackPage()
}

const useAnalytics = () => {
  const isAnalyticsAllowed = useAtomValue(cookieConsentAtom)
  const isCookieConsentSet = useAtomValue(isCookieConsentSetAtom)
  // Initialize analytics
  useEffect(() => {
    if (isSSR()) {
      return
    }
    console.log('init tracker')
    const { MATOMO_URL: url, MATOMO_SITE_ID: siteId } =
      getConfig().publicRuntimeConfig
    Analytics.init({ url, siteId, enabled: isAnalyticsAllowed }).connect()
    return () => Analytics.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // Only run this once, no variables are being passed here.
  }, [])

  // Set enabled if already enabled by user, and when value changes
  useEffect(() => {
    if (isSSR() || !isCookieConsentSet) {
      return
    }
    console.log('set analytics allowed', isAnalyticsAllowed)
    Analytics.setEnabled(isAnalyticsAllowed)
  }, [isCookieConsentSet, isAnalyticsAllowed])

  return Analytics
}
export default useAnalytics
