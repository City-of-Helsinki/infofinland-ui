import { useEffect, useState } from 'react'
import getConfig from 'next/config'

// Add askem (react and share) script to page.
export const useAskem = () => {
  const [locale] = useState('fi');

  useEffect(() => {
    // Get the locale specific api key.
    const configKey = `REACT_AND_SHARE_APIKEY_${locale.toUpperCase()}`;
    const apiKey = getConfig().publicRuntimeConfig[configKey.toUpperCase()];

    const script = document.createElement('script');
    script.src = 'https://cdn.reactandshare.com/plugin/rns.js';
    script.type = 'text/javascript';

    window.askem = {
      apiKey: apiKey,
      title: 'Infofinland',
      canonicalUrl: window.location.href,
      categories: ['Infofinland'],
    };

    document.body.appendChild(script);

    return () => { document.body.removeChild(script); }
  }, [locale]);
}
