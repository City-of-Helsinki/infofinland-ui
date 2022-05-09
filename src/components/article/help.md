# Jos sivu lakkaa päivittymästä,

Jos sivu lakkaa päivittymästä eikä odotus, uudelleentallentelu, unpublish/publish tai muutkaan loitsut auta:

1. Tarkasta että sivu tulee API:sta oikein (edit.infofinland.fi/jsonapi/node/page/[uuid]) vastaa sitä mitä drupalissa näkyy. Varmista ettei uusin sisältö ole Draft-tilassa
2. Varmistä että sivu toimii omalla koneella. Käynnistä infofinland-ui tuotantko-drupalia vasten ja tarkasta että uusin sisältö näkyy oikein.
3. Mikäli sivu ei ole vieläkään päivittynyt, avaa openshift-portaali
   [https://console-openshift-console.apps.arodevtest.hel.fi/k8s/ns/hki-kanslia-infofinland-test/pods](https://console-openshift-console.apps.arodevtest.hel.fi/k8s/ns/hki-kanslia-infofinland-test/pods)
   ja sieltä käynnissä oleva podi (infofinland-ui-nnnxyz). Mene terminal-tabiin. Voit ottaa myös oc-clientilla terminaaliyhteyden PODiin.
4. Mene hakemistoon `app/.next/server/pages/[kieli]/` ja poista jumittuneen sivun html ja json-tiedostot (esim `app/.next/server/pages/fi/cities.html` ja `app/.next/server/pages/fi/cities.json` )
5. Navigoi sivulle, katso että uusin sisältö lataantuu. Käytä incognito-ikkunaa varmistaaksesi ettei selain anna vanhaa sivua. Sivun päivittyminen voi vaatia useamman latauksen `stale-while-reloading`-headerin vuoksi. Tarkista että poistamasi tiedostot ovat luotu uudelleen.

Mikäli jumittuineita sivuja on paljon tai poistaminen ei jostain syystä auta, luo uusi podi. Nopein ja helpoin tapa on poistaa käynnissä olevan UI-podin jolloin uusi pyörähtää käyntiin.

Mikäli tarvitset muutoksia ympäristömuuttujiin, aja buildista viimeinen vaihe (tai koko buildi jos buildin aikaiset muuttujat pitää rakentaa uudestaan)
[https://dev.azure.com/City-of-Helsinki/infofinland/\_build?definitionId=1456](https://dev.azure.com/City-of-Helsinki/infofinland/_build?definitionId=1456)
-> Run new -> Stages to run -> Valitse viimeinen vaihe (Test Deployment) (or Production or whatever) jos haluat vain käynnistää podin uudelleen, kaikki vaiheet jos haluat muuttaa buildin ympäristomuuttujia tai itse buildia.

## Fixing stuck pages in infofinland.fi

Go to OpenShift and delete the running UI-pod. It should redeploy a fresh container from the last build.
