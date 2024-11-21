import { useEffect, useState } from 'react'
import getConfig from 'next/config'
import { loadAskemScript, removeAskemScript } from '@/lib/askem'

// Only set the script tag once and reset after locale or title changes.
const useAddAskem = async (locale = 'fi', title = 'Infofinland') => {
  const [askemScript, setAskemScript] = useState(false);

  useEffect(() => {
    if (!askemScript) {
      // resetAskemAfterPageLoad();
    }
    else {
      askemScript();
    }

    async function resetAskemAfterPageLoad(){
      const reset = await loadAskemScript();
      if (!reset) {
        return () => { removeAskemScript() }
      }

      setAskemScript(reset);

      const configKey = `REACT_AND_SHARE_APIKEY_${locale.toUpperCase()}`;
      const apiKey = getConfig().publicRuntimeConfig[configKey.toUpperCase()];

      if (apiKey) {
        window.askem.settings = {
          apiKey: apiKey,
          title: title,
          canonicalUrl: window.location.href,
          categories: ['Infofinland'],
        };
        reset();
      }
    }
  }, [locale, title, askemScript]);
}

export default useAddAskem;
