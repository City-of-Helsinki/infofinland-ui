import { useEffect, useRef } from 'react'
import getConfig from 'next/config'
import { loadAskemScript } from '@/lib/askem'

// Only set the script tag once and reset after locale or title changes.
const useAddAskem = async (locale, title) => {
  let apiKey = useRef('');

  useEffect(() => {
    doAskemReset();

    // Wait for the askem-libary to be initialized on first page load
    // or just reset the library.
    async function doAskemReset(){
      let reset = null;
      const configKey = `REACT_AND_SHARE_APIKEY_${locale.toUpperCase()}`;
      apiKey.current = getConfig().publicRuntimeConfig[configKey.toUpperCase()];

      if (!apiKey.current) {
        return () => {};
      }

      setSettings();

      reset = await loadAskemScript().catch((error)=> {
        console.log(`Error while initializing askem script: ${error}`);
        return () => {};
      });

      reset();

      return () => {};
    }

    function setSettings() {
      const settings = {
        apikey: apiKey.current,
        title: title,
        canonicalUrl: window.location.href
      }
      if (window.askem) {
        window.askem.settings = settings
      }
      else {
        window.askem = {settings: settings}
      }
    }

  }, [locale, title]);
}

export default useAddAskem;