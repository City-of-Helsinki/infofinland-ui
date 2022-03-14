const ELASTIC_MOCK = {
  "took": 10,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 478,
      "relation": "eq"
    },
    "max_score": 1,
    "hits": [
      {
        "_index": "first_finnish",
        "_type": "_doc",
        "_id": "entity:node/39411:fi",
        "_score": 1,
        "_source": {
          "_language": "fi",
          "title": [
            "Muut kuin EUkansalaiset"
          ]
        }
      },
      {
        "_index": "first_finnish",
        "_type": "_doc",
        "_id": "entity:node/39416:fi",
        "_score": 1,
        "_ignored": [
          "field_text.keyword"
        ],
        "_source": {
          "_language": "fi",
          "field_description": [
            "<p>   Jos haluat muuttaa Suomessa asuvan puolison luokse ja olet jonkin muun kuin EUmaan tai Pohjoismaan kansalainen tarvitset oleskeluluvan<p>"
          ],
          "field_text": [
            "Suomen rajaliikennettä rajoitetaan Monilla mailla on edelleen käytössä karanteenimääräyksiä Lue koronaviruksen vaikutuksista oleskelulupiin InfoFinlandin sivulta Koronavirus ja muutto Suomeen ",
            "Jos olet avioliitossa Suomen kansalaisen kanssa joka asuu Suomessa voit saada oleskeluluvan Suomeen perhesiteen perusteella Myös puoliso joka on samaa sukupuolta voi saada oleskeluluvan jos te olette avioliitossa tai rekisteröidyssä parisuhteessa Suomen kansalaisen avopuoliso Jos olet avoliitossa Suomen kansalaisen kanssa joka asuu Suomessa voit saada oleskeluluvan Suomeen perhesiteen perusteella Luvan voi saada jos olet asunut yhdessä avopuolisosi kanssa vähintään kaksi vuotta tai sinulla on avopuolisosi kanssa yhteinen lapsi silloin ei vaadita kahden vuoden yhdessä asumista tai luvan myöntämiselle on jokin muu painava syy Sinun ja avopuolisosi pitää todistaa että olette asuneet yhdessä kaksi vuotta jos haet lupaa tällä perusteella Todisteeksi käy esimerkiksi talonkirjaote tai vuokrasopimus jossa on teidän molempien nimet Jos sinulla ja puolisollasi on kotipaikka eri valtioissa oleskelulupaa ei voida myöntää sillä perusteella että olette asuneet yhdessä esimerkiksi lomamatkojen aikana Sinä tai avopuolisosi ette saa olla avioliitossa toisen henkilön kanssa Toimeentuloedellytys Suomen kansalaisen puolisolle Sinulta ei edellytetä turvattua toimeentuloa jos olet Suomen kansalaisen perheenjäsen Sinulla on rajoittamaton työntekooikeus Saat aloittaa työskentelyn vasta kun sinulle on myönnetty oleskelulupa Tietoa luvan hakemisesta on kohdassa Oleskeluluvan hakeminen ",
            "Jos aviopuolisollasi on oleskelulupa Suomeen ja hän asuu Suomessa voit saada oleskeluluvan Suomeen perhesiteen perusteella Myös puoliso joka on samaa sukupuolta voi saada oleskeluluvan Ulkomaan kansalaisen avopuoliso Jos avopuolisollasi on oleskelulupa Suomeen ja hän asuu Suomessa voit saada oleskeluluvan Suomeen perhesiteen perusteella Luvan voi saada jos olet asunut yhdessä avopuolisosi kanssa vähintään kaksi vuotta tai sinulla on avopuolisosi kanssa yhteinen lapsi silloin ei vaadita kahden vuoden yhdessä asumista Sinun ja avopuolisosi pitää todistaa että olette asuneet yhdessä kaksi vuotta jos haet lupaa tällä perusteella Todisteeksi käy esimerkiksi talonkirjaote tai vuokrasopimus jossa on teidän molempien nimet Jos sinulla ja puolisollasi on kotipaikka eri valtioissa oleskelulupaa ei voida myöntää sillä perusteella että olette asuneet yhdessä esimerkiksi lomamatkojen aikana Sinä tai avopuolisosi ette saa olla avioliitossa toisen henkilön kanssa Toimeentuloedellytys ulkomaan kansalaisen puolisolle Jotta voisit saada oleskeluluvan Suomeen sinulla tai puolisollasi täytyy olla riittävästi tuloja myös sinun toimeentuloasi varten Maahanmuuttoviraston sivuilla voit tarkistaa kuinka paljon tuloja teillä täytyy olla Jos puolisosi on saanut oleskeluluvan kansainvälisen suojelun perusteella mutta hänellä ei ole pakolaisasemaa silloin vaatimus riittävistä tuloista koskee teitä Tietyissä tilanteissa voidaan toimeentuloedellytyksestä kuitenkin yksittäisessä tapauksessa poiketa jos siihen on erityinen syy tai lapsen etu sitä vaatii Tietoa luvan hakemisesta on kohdassa Oleskeluluvan hakeminen ",
            "Jos aviopuolisollasi on oleskelulupa Suomeen kansainvälisen suojelun perusteella ja hänellä on pakolaisasema voit saada oleskeluluvan Suomeen perhesiteen perusteella Pakolaisen avopuoliso Jos avopuolisollasi on oleskelulupa Suomeen kansainvälisen suojelun perusteella ja hänellä on pakolaisasema voit saada oleskeluluvan Suomeen perhesiteen perusteella Luvan voi saada jos olet asunut yhdessä avopuolisosi kanssa vähintään kaksi vuotta tai sinulla on avopuolisosi kanssa yhteinen lapsi silloin ei vaadita kahden vuoden yhdessä asumista Sinun ja avopuolisosi pitää todistaa että olette asuneet yhdessä kaksi vuotta jos haet lupaa tällä perusteella Todisteeksi käy esimerkiksi talonkirjaote tai vuokrasopimus jossa on teidän molempien nimet Jos sinulla ja puolisollasi on kotipaikka eri valtioissa oleskelulupaa ei voida myöntää sillä perusteella että olette asuneet yhdessä esimerkiksi lomamatkojen aikana Sinä tai avopuolisosi ette saa olla avioliitossa toisen henkilön kanssa Toimeentuloedellytys pakolaisen puolisolle Toimeentuloedellytys kohdistuu teihin eri tavalla jos puolisosi on saanut oleskeluluvan kansainvälisen suojelun perusteella ja hänellä on pakolaisasema Suomessa Sinulta ei edellytetä riittävää toimeentuloa Jos puolisosi on saanut turvapaikan tai pakolaisaseman kiintiöpakolaisena ennen 172016 ja olette muodostaneet perheenne ennen kuin hän on tullut Suomeen Jos puolisosi saa pakolaisaseman 172016 tai myöhemmin sinun pitää hakea oleskelulupaa kolmen kuukauden kuluessa siitä kun puolisosi saa päätöksen hakemukseensa Kolmen kuukauden määräajan laskeminen alkaa siitä päivästä kun puolisosi on saanut päätöksen tiedoksi Jos et ehdi sinusta riippumattomista syistä hakea oleskelulupaa kolmen kuukauden sisällä voit silti hakea perheenyhdistämistä Kerro myös hakemuksessa miksi 3 kuukauden aika ylittyi Voit hakea perheenyhdistämistä myös myöhemmin mutta silloin teitä koskee vaatimus riittävistä tuloista Toimeentuloedellytys koskee teitä myös silloin jos avioliittonne on solmittu sen jälkeen kun puolisosi tuli Suomeen Tietyissä tilanteissa voidaan toimeentuloedellytyksestä kuitenkin yksittäisessä tapauksessa poiketa jos siihen on erityinen syy tai lapsen etu sitä vaatii Tietoa luvan hakemisesta on kohdassa Oleskeluluvan hakeminen ",
            "Oleskelulupaa ei tavallisesti voi saada seurustelusuhteen perusteella Suomessa seurustelukumppani ei lain mukaan ole perheenjäsen Joissakin tapauksissa voit kuitenkin saada tilapäisen B oleskeluluvan Suomeen seurustelusuhteen perusteella Jotta sinulle voidaan myöntää oleskelulupa Suomeen sinun ja kumppanisi suhteen täytyy olla vakiintunut Todiste vakiintuneesta suhteesta voi olla esimerkiksi se että te aiotte solmia avioliiton Suomessa Sinä tai kumppanisi ette saa olla avioliitossa toisen henkilön kanssa Jotta voisit saada oleskeluluvan sinulla täytyy olla riittävät varat toimeentuloasi varten Varojen on oltava sinun vapaassa käytössäsi esimerkiksi omalla pankkitililläsi Suomessa asuvan seurustelukumppanisi tuloja ei oteta huomioon",
            "Tavallisesti sinun täytyy hakea ensimmäistä oleskelulupaa ennen kuin tulet Suomeen Hae lupaa kotimaassasi tai muussa maassa jossa oleskelet laillisesti Voit hakea ensimmäistä oleskelulupaa myös Suomessa jos puolisosi on Suomen kansalainen ja itse olet viisumivapaan maan kansalainen eli et tarvitse viisumia jotta voisit tulla Suomeen Voit hakea lupaa verkossa Enter Finland palvelun kautta Kun olet tehnyt hakemuksen sinun pitää käydä lähimmässä Suomen edustustossa tai Maahanmuuttoviraston palvelupisteessä jotta voit todistaa henkilöllisyytesi ja esittää hakemuksen liitteiden alkuperäiset kappaleet Sinun pitää käydä edustustossa tai palvelupisteessä kolmen kuukauden kuluessa siitä kun teit hakemuksen verkossa Hakemus voidaan ottaa käsittelyyn vasta sen jälkeen kun olet käynyt edustustossa tai palvelupisteessä Edustustoon tai palvelupisteeseen pitää tavallisesti varata aika etukäteen Muista tarkistaa Enter Finland tilisi säännöllisesti Jos hakemukseesi tarvitaan lisäselvityksiä saat tiedon siitä Enter Finland tilillesi Jos et voi tai osaa tehdä hakemusta verkossa voit myös tuoda paperisen hakulomakkeen ja sen liitteet lähimpään Suomen edustustoon tai Suomessa Maahanmuuttoviraston palvelupisteeseen Voit tulostaa hakulomakkeen Maahanmuuttoviraston verkkosivuilta Oleskelulupahakemus on maksullinen Maksu pitää maksaa silloin kun lupaa haetaan",
            "Suomalainen henkilötunnus Jos sinulle myönnetään oleskelulupa Suomeen sinut rekisteröidään automaattisesti Suomen väestötietojärjestelmään Samalla saat suomalaisen henkilötunnuksen Kun olet muuttanut Suomeen sinun täytyy käydä lähimmässä Digija väestötietoviraston palvelupaikassa rekisteröitymässä asukkaaksi Lue lisää InfoFinlandin sivulta Asukkaaksi rekisteröityminen ",
            "Puolisolle ei myönnetä oleskelulupaa jos oleskeluluvan edellytykset eivät täyty Aviopuolisolle lupa voidaan jättää myöntämättä myös silloin jos Suomen viranomaiset katsovat että avioliitto on solmittu vain oleskeluluvan takia eivätkä puolisot aio viettää perheelämää yhdessä Viranomaiset voivat epäillä että avioliitto on solmittu oleskeluluvan takia esimerkiksi silloin jos olette solmineet avioliiton vain lyhyen tuttavuuden jälkeen teillä on suuri ikäero tai toisella teistä on ollut useita lyhyitä avioliittoja Jos saat lupahakemukseen kielteisen päätöksen voit valittaa siitä hallintooikeuteen Ohjeet saat lupapäätöksen liitteenä Lue lisää oleskelulupaongelmista InfoFinlandin sivulta Oleskelulupaongelmat"
          ],
          "title": [
            "Oleskelulupa puolisolle"
          ]
        }
      },
      {
        "_index": "first_finnish",
        "_type": "_doc",
        "_id": "entity:node/39417:fi",
        "_score": 1,
        "_ignored": [
          "field_text.keyword",
          "field_description.keyword"
        ],
        "_source": {
          "_language": "fi",
          "field_description": [
            "<p>   Turvapaikkaa Suomesta voi hakea vain paikan päällä Suomessa Sinulla pitää olla perusteltu syy hakea turvapaikkaa esimerkiksi vaino Tällä sivulla on tietoa turvapaikanhakijalle<p><p>  Voit hakea turvapaikkaa Suomesta jos sinulla on perusteltu syy pelätä että sinua vainotaan kotimaassasi Vainon syitä voivat olla alkuperä uskonto kansallisuus tiettyyn yhteiskunnalliseen ryhmään kuuluminen tai poliittiset mielipiteet<p><p>  Maahanmuuttovirasto tutkii onko turvapaikalle perusteita ja tekee päätöksen<p><p>  Voit hakea turvapaikkaa vain itsellesi<p>"
          ],
          "field_text": [
            "Voit hakea turvapaikkaa Suomesta vain Suomen valtion alueella Turvapaikan hakemista varten ei ole erillistä lomaketta jonka voisit täyttää etukäteen Kun saavut Suomeen ilmoita heti rajatarkastusviranomaiselle tai poliisille että haluat hakea turvapaikkaa Rajatarkastusviranomainen tai poliisi rekisteröi sinut turvapaikanhakijaksi kirjaa perustietosi ja ottaa sormenjälkesi Kun viranomainen on ottanut turvapaikkahakemuksesi vastaan sinut ohjataan vastaanottokeskukseen Siellä voit asua sillä aikaa kun Maahanmuuttovirasto käsittelee hakemustasi Voit asua myös muualla kuin vastaanottokeskuksessa mutta silloin sinun täytyy maksaa asuminen itse",
            "EUmaiden ja Sveitsin Norjan Islannin ja Liechtensteinin alueella turvapaikkaa pitää hakea siinä valtiossa jonka alueelle ensin saapuu Jos olet hakenut turvapaikkaa tai oleskellut jossain muussa EUmaassa tai Sveitsissä Norjassa Islannissa tai Liechtensteinissa ennen kun tulit Suomeen hakemustasi ei käsitellä Suomessa Tässä tapauksessa sinut käännytetään takaisin siihen maahan jossa olit ennen kuin tulit Suomeen Tätä kutsutaan Dublinmenettelyksi Jos olet Euroopan Unionin jäsenmaan kansalainen et todennäköisesti saa turvapaikkaa Suomesta Suomi pitää kaikkia EUmaita turvallisina kansalaisilleen Kaikki EUmaiden kansalaisten hakemukset kuitenkin tutkitaan InfoFinlandin sivulta EUkansalaiset löydät tietoa siitä miten voit muuttaa Suomeen muista syistä kuin turvapaikanhakijana",
            "Jos olet alle 18vuotias turvapaikanhakija ja saavut Suomeen ilman huoltajaa sinulle määrätään edustaja Edustaja on luotettava aikuinen joka auttaa hoitaa asioitasi sillä aikaa kun Maahanmuuttovirasto käsittelee hakemustasi Edustaja tulee mukaan kun sinun pitää puhua viranomaisten kanssa Lisäksi edustajasi selvittää voitko päästä yhteen perheesi kanssa Sinulla on oikeus majoitukseen ruokaan ja terveydenhoitoon Sinulla on myös oikeus käydä koulua",
            "Maahanmuuttovirasto käsittelee hakemuksesi ja tekee päätöksen Maahanmuuttovirasto selvittää henkilöllisyytesi ja matkareittisi Suomeen sekä arvioi voitko saada turvapaikan Suomesta On tavallista että hakemuksen käsittely kestää useita kuukausia Kun olet hakenut turvapaikkaa sinulla on oikeus oleskella Suomessa niin kauan kuin hakemuksesi käsittely kestää Sinä aikana et voi matkustaa ulkomaille Jos matkustat viranomaiset voivat päättää että hakemuksesi ei ole enää voimassa Maahanmuuttovirasto lähettää sinulle kutsun turvapaikkapuhutteluun Kutsussa lukee tulkkauskieli puhuttelupaikan tarkka osoite sekä kellonaika",
            "Turvapaikkapuhuttelu on tärkein tapahtuma kun hakemustasi käsitellään Puhuttelussa sinulta kysytään niistä tapahtumista ja syistä joiden takia jouduit lähtemään kotimaastasi On tärkeää että kerrot mahdollisimman tarkasti mitä on tapahtunut Maahanmuuttovirasto päättää kertomuksesi perusteella saatko turvapaikan Suomesta Sinulla on oikeus turvapaikanhakijana käyttää puhuttelussa oikeudellista avustajaa Avustaja osallistuu turvapaikkapuhutteluun oman harkintansa mukaan Jos tarvitset tulkkia Maahanmuuttovirasto hankkii tulkin",
            "Saat jäädä Suomeen jos sinulle myönnetään turvapaikka tai oleskelulupa muulla perusteella Sinulle voidaan myöntää Suomesta turvapaikka jos viranomaiset katsovat että joudut kotimaassasi vainotuksi alkuperän uskonnon kansallisuuden tiettyyn yhteiskunnalliseen ryhmään kuulumisen tai poliittisen mielipiteen takia Jos et saa turvapaikkaa voit joissakin tapauksissa saada oleskeluluvan toissijaisen suojelun perusteella Toissijaisen suojelun perusteella voit saada oleskeluluvan jos sinua uhkaa kuolemanrangaistus tai teloitus kidutus tai muu epäinhimillinen kohtelu tai rangaistus tai vakava henkilökohtainen vaara joka johtuu aseellisesta konfliktista Kun haet turvapaikkaa Maahanmuuttovirasto tutkii samalla myös voitko saada oleskeluluvan jollakin muulla perusteella",
            "Jos et saa turvapaikkaa tai oleskelulupaa muulla perusteella sinut käännytetään Suomesta Sinulla on mahdollisuus myös valittaa kielteisestä päätöksestä hallintooikeuteen Päätöksen liitteenä on ohje miten voit tehdä valituksen InfoFinlandin sivulta Kielteinen oleskelulupapäätös löydät tietoa siitä mitä voit tehdä jos saat kielteisen päätöksen",
            "Hakemuksesi käsittelyn aikana voit saada neuvontaa ja oikeusapua julkisesta oikeusaputoimistosta Jos haluat oikeudellisen avustajan ota yhteys oikeusaputoimistoon Vastaanottokeskus auttaa sinua tarvittaessa Oikeusaputoimisto voi ohjata sinut myös yksityiselle lakimiehelle tai yksityiseen lakitoimistoon Voit saada neuvontaa myös Pakolaisneuvonta rystä Pakolaisneuvonta antaa neuvontaa myös niille henkilöille jotka ovat Suomessa ilman oleskelulupaa",
            "Turvapaikanhakijoilla ei ole oikeutta Suomen sosiaaliturvaan Tämä tarkoittaa että et voi saada Kelan etuuksia Vastaanottokeskus maksaa sinulle vastaanottorahaa Sitä maksetaan niin kauan kuin turvapaikkahakemuksesi käsittely kestää Vastaanottoraha on pieni summa joka on tarkoitettu välttämättömiin kuluihin Jos saat oleskeluluvan ja asut vakinaisesti Suomessa sinulla on oikeus Suomen sosiaaliturvaan Suomen sosiaaliturvaan kuulumista pitää hakea Kelasta sen jälkeen kun oleskelulupa on myönnetty",
            "Saat tehdä ansiotyötä Suomessa jos turvapaikkahakemuksesi jättämisestä on kulunut kolme kuukautta ja sinulla on voimassa oleva passi tai muu matkustusasiakirja jonka esitit viranomaiselle silloin Jos et esittänyt viranomaiselle turvapaikkahakemuksen yhteydessä voimassa olevaa matkustusasiakirjaa saat tehdä ansiotyötä Suomessa kun on kulunut hakemuksesi jättämisestä kuusi kuukautta Työntekooikeus jatkuu siis siihen saakka kunnes olet saanut turvapaikanhakemukseesi lainvoimaisen päätöksen Jos Maahanmuuttovirasto tekee myönteisen päätöksen turvapaikkahakemukseesi saat oleskeluluvan Siihen sisältyy lähes aina työntekooikeus Jos Maahanmuuttovirasto tekee kielteisen päätöksen turvapaikkahakemukseesi sinulla on oikeus tehdä työtä mahdollisen valituksesi käsittelyn ajan Työntekoa varten tarvitset verokortin Suomessa Hae verokortti lähimmästä Verotoimistosta ja toimita se työnantajallesi Lue lisää InfoFinlandin sivulta Verokortti  Jos työntekosi on jatkuvaa voit hakea oleskelulupaa Suomeen myös työnteon perusteella InfoFinlandin sivulta Töihin Suomeen löydät lisätietoa työntekijän oleskeluluvista"
          ],
          "title": [
            "Turvapaikka Suomesta"
          ]
        }
      },
      {
        "_index": "first_finnish",
        "_type": "_doc",
        "_id": "entity:node/39420:fi",
        "_score": 1,
        "_ignored": [
          "field_text.keyword",
          "field_description.keyword"
        ],
        "_source": {
          "_language": "fi",
          "field_description": [
            "<p>   <p><p>  Jos olet jonkin muun kuin EUmaan tai Pohjoismaan kansalainen ja haluat vierailla Suomessa esimerkiksi turistina sukulaisten tai ystävien luona tai työmatkalla tarvitset yleensä viisumin Et tarvitse viisumia jos olet viisumivapaan valtion kansalainen<p><p>Suomi kuuluu Schengenalueeseen Schengenalueeseen kuuluvilla mailla on yhdenmukaiset viisumivaatimukset Ulkomaalaiset jotka haluavat matkustaa Suomeen lyhyeksi ajaksi esimerkiksi lomamatkalle liikematkalle tai vierailulle sukulaisten luokse tarvitsevat viisumin jos he eivät ole viisumivapaan maan kansalaisia Viisumi on maahantulolupa lyhytaikaista ja tilapäistä oleskelua varten joka kestää enintään kolme kuukautta<p><p>  Voit tarkistaa ulkoministeriön verkkosivuilta tai sinua lähimpänä olevasta Suomen edustustosta tarvitsetko viisumia Schengenalueelle<p>"
          ],
          "field_text": [
            "Voit matkustaa Suomeen ja muihin Schengenmaihin jos sinulla on voimassaoleva passi tai muu Suomen hyväksymä matkustusasiakirja Saat oleskella Suomessa ja muualla Schengenalueella enintään kolme kuukautta kuuden kuukauden sisällä alkaen siitä päivästä kun tulit Schengenalueelle",
            "Sinulla pitää aina olla viisumi kun saavut Suomeen tai muiden Schengenmaiden alueelle Saat oleskella Suomessa tai muualla Schengenalueella ilman oleskelulupaa sen ajan jonka viisumisi on voimassa Jos sinulla on viisumi tai oleskelulupa johonkin Schengenmaahan voit matkustaa Schengenalueen sisällä eikä sinun tarvitse hankkia erillistä viisumia alueen muihin maihin Näin haet Schengenviisumia Hae viisumia lähimmästä Suomen edustustosta tai viisumikeskuksesta Sinun täytyy oleskella laillisesti siinä maassa jossa haet viisumia Niissä maissa joissa ei ole Suomen edustustoa jokin toinen maa voi edustaa Suomea viisumiasioissa Silloin voit hakea viisumia tämän maan edustustosta Ulkoministeriön sivuilla on lista niistä maista joissa jokin toinen maa edustaa Suomea viisumiasioissa Sinun pitää hakea viisumia viisumihakemuslomakkeella Lomakkeita saa ulkoministeriön verkkosivuilta ja Schengenmaiden edustustoista Viisumihakemukseen tarvittavien liitteiden määrä saattaa vaihdella riippuen siitä missä maassa haet viisumia Voit tarkistaa edustustosta mitä liitteitä viisumihakemukseesi tarvitaan Hakemus pitää toimittaa siihen edustustoon tai viisumikeskukseen josta haet viisumia Et voi toimittaa viisumihakemustasi sähköpostitse tai faksilla",
            "Viisumin pidentäminen Suomessa Poliisi voi pidentää viisumiisi merkittyä oleskeluaikaa tai viisumin voimassaoloaikaa jos et perustellusta syystä pysty lähtemään Suomesta kun viisumisi umpeutuu Perusteltuja syitä viisumin pidentämiselle voivat olla esimerkiksi äkillinen vakava sairaus joka estää matkustamisen Suomessa asuvan sukulaisen äkillinen vakava sairaus tai kuolema lennon peruuntuminen lakon tai sään vuoksi tärkeiden liikeneuvottelujen jatkuminen odotettua pitempään",
            "Ulkomaiden edustustot auttavat Suomessa hätätilanteeseen joutuneita kansalaisiaan Ne voivat esimerkiksi avustaa sinua jos olet joutunut onnettomuuteen sairastunut tai joutunut rikoksen uhriksi Edustusto voi myöntää sinulle uuden passin jos passisi on kadonnut tai varastettu Jos olet Suomessa matkailijana ja joudut vaikeaan tilanteeseen ota yhteys kotimaasi edustustoon"
          ],
          "title": [
            "Lyhyt oleskelu Suomessa"
          ]
        }
      },
      {
        "_index": "first_finnish",
        "_type": "_doc",
        "_id": "entity:node/39424:fi",
        "_score": 1,
        "_ignored": [
          "field_text.keyword"
        ],
        "_source": {
          "_language": "fi",
          "field_description": [
            "<p>Tarvitsetko neuvontaa oleskelulupaasioissa Tältä sivulta löydät tietoa mistä voit pyytää apua ja neuvoa<p>"
          ],
          "field_text": [
            "Jos sinulla on ongelmia tai epäselvyyksiä oleskeluluvan kanssa voit kysyä neuvoa seuraavista paikoista Maahanmuuttovirasto Suomen edustustot ulkomailla oman kuntasi ohjaus ja neuvontapalvelut maahan muuttaneille Suomessa Pakolaisneuvonta oikeusaputoimistot Maahanmuuttoviraston verkkosivuilla on paljon tietoa oleskeluluvista Maahanmuuttovirasto antaa lupiin liittyvää neuvontaa myös puhelimitse Suomen ulkomailla olevat edustustot palvelevat ulkomailla olevia oleskeluluvan hakijoita Monissa kaupungeissa on maahanmuuttajien neuvontapalveluita joissa työskentelee maahanmuuttoasioihin erikoistuneita neuvojia Pakolaisneuvonta antaa oikeudellista apua turvapaikkaprosesseissa sekä myös muita oleskelulupia koskevissa prosesseissa Lisäksi Pakolaisneuvonta antaa yleistä oikeudellista neuvontaa turvapaikka ja oleskelulupaasioihin liittyvissä kysymyksissä Myös oikeusaputoimistojen puoleen voi kääntyä tilanteessa jossa tarvitsee neuvontaa tai oikeusapua oleskelulupaasiassa Huomaa että vain Maahanmuuttovirasto voi tehdä oleskelulupia koskevia päätöksiä"
          ],
          "title": [
            "Oleskelulupaongelmat"
          ]
        }
      },
      {
        "_index": "first_finnish",
        "_type": "_doc",
        "_id": "entity:node/39429:fi",
        "_score": 1,
        "_ignored": [
          "field_text.keyword",
          "field_description.keyword"
        ],
        "_source": {
          "_language": "fi",
          "field_description": [
            "<p>  Kun muutat Suomeen vakinaisesti sinut rekisteröidään Suomen väestötietojärjestelmään Samalla saat suomalaisen henkilötunnuksen Jos haluat kotikunnan yleensä sinun täytyy käydä Digi ja väestötietovirastossa <p><p>  Kaikkien ulkomaalaisten osoitetta ei voida tallentaa väestötietojärjestelmään Rekisteröinti voidaan tehdä vain jos rekisteröinnin edellytykset täyttyvät<p><p>  Ota myös huomioon että henkilötunnuksen saaminen ei rekisteröi sinua automaattisesti tietyn paikkakunnan asukkaaksi eli et saa kotikuntaa Kotikunta voi olla kaupunki tai tavallinen kunta Tarvitset kotikunnan jotta voit käyttää kaupungin tai kunnan palveluita Kunnan palveluja ovat esimerkiksi terveydenhuolto koulutus ja lasten varhaiskasvatus<p>"
          ],
          "field_text": [
            "Henkilötunnus on 11 merkkiä pitkä numerosarja joka muodostuu syntymäpäivän ja sukupuolen perusteella Tarvitset henkilötunnuksen kun asioit esimerkiksi viranomaisten pankkien ja työnantajan kanssa Samaa henkilötunnusta ei voi olla kenelläkään muulla Saat henkilötunnuksen jos sinut rekisteröidään väestötietojärjestelmään Voit saada henkilötunnuksen jos oleskelet laillisesti Suomessa Laillinen oleskelu voi perustua esimerkiksi oleskelulupaan EUn vapaaseen liikkuvuuteen viisumiin tai viisumivapauteen Lisäksi edellytyksenä on että jokin alla olevista edellytyksistä täyttyy Tarvitset henkilötunnuksen Suomessa tapahtuvan työnteon opiskelun tai muun vastaavan syyn vuoksi Perheenjäsenelläsi on jo rekisteröity osoite Suomessa Maahanmuuttovirasto on myöntänyt sinulle oleskeluluvan tai oleskelukortin tai rekisteröinyt EUkansalaisen oleskeluoikeutesi Suomeen Voit pyytää rekisteröintiä ja henkilötunnusta Digi ja väestötietovirastosta verotoimistosta jos tarvitset henkilötunnusta verotusta varten Myös Maahanmuuttovirasto myöntää yleensä henkilötunnuksen kun se tekee päätöksen oleskeluluvasta tai EUkansalaisen oleskeluoikeudesta tai EUperheenjäsenen oleskeluoikeudesta Jos olet saanut henkilötunnuksen Maahanmuuttovirastosta tai Verohallinnolta mutta haluat että osoitteesi ja perhesuhdetietosi tallennetaan väestötietojärjestelmään sinun täytyy pyytää niiden rekisteröintiä Digi ja väestötietovirastolta",
            "Kun henkilötietosi rekisteröidään samalla sinulle tallennetaan myös osoite Osoite voi olla tilapäinen vakinainen tai pelkkä postiosoite Tilapäinen osoite Tilapäinen osoite on voimassa tilapäisesti ja sinut on rekisteröity asukkaaksi kyseiseen osoitteeseen tietyksi määräajaksi Tilapäinen osoite on yleensä voimassa yhden vuoden kerrallaan Vakinainen osoite ja kotikunta Kun Digi ja väestötietovirasto rekisteröi sinulle vakinaisen osoitteen se rekisteröi sinut asukkaaksi siihen osoitteeseen toistaiseksi Osoite on voimassa kunnes teet muuttoilmoituksen toiseen osoitteeseen Samalla sinulle tallennetaan myös kotikunta Suomessa Jos sinulla on kotikunta Suomessa sinulla on tavallisesti oikeus käyttää tämän kunnan palveluja Kunnat tarjoavat asukkailleen monia palveluja Kunnan palveluja ovat esimerkiksi terveydenhuolto koulutus ja lasten varhaiskasvatus Sinun kannattaa selvittää onko sinulla ja muilla perheesi jäsenillä oikeus kotikuntaan Suomessa Oikeus kotikuntaan Suomessa määräytyy kotikuntalain mukaan Digi ja väestötietovirastosta voit selvittää onko sinulla oikeus kotikuntaan Suomessa Lue lisää InfoFinlandin sivulta Kotikunta Suomessa Postiosoite Jos sinulle rekisteröidään postiosoite sinua ei rekisteröidä asukkaaksi kyseiseen osoitteeseen Postiosoitetta voidaan käyttää silloin jos sinulla ei ole pysyvää asuinosoitetta asut hotellissa tai haluat noutaa postisi postitoimistosta",
            "Jos sinulla ei ole henkilötunnusta sinun täytyy käydä henkilökohtaisesti Digi ja väestötietovirastossa Jos sinulla on jo henkilötunnus voit rekisteröidä tilapäisen osoitteen Suomessa kun teet muuttoilmoituksen postitoimistossa tai internetissä Muuttoilmoituksella voit ilmoittaa vain osoitteen Jos haluat että Digi ja väestötietovirasto tallentaa tiedot siviilisäädystäsi esimerkiksi avioliitostasi ja perhesuhteistasi sinun täytyy esittää viralliset todistukset niistä Jos haluat että kotikuntasi tallennetaan väestötietojärjestelmään yleensä sinun pitää käydä henkilökohtaisesti Digi ja väestötietovirastossa Joissain tapauksissa sitä ei kuitenkaan tarvita Tarkista Digi väestötietoviraston internetsivuilta täytyykö sinun käydä siellä Ennen kuin tulet virastoon varaa aika asiointiin Digi ja väestötietoviraston internetsivuilta Ennen virastoon tuloa voit täyttää ulkomaalaisen rekisteröinti lomakkeen joka löytyy Digi ja väestötietoviraston sivuilta Voit myös täyttää sen palvelupaikassa Kun menet Digi ja väestötietoviraston palvelupaikkaan ota mukaasi tilanteesi mukaiset asiakirjat voimassa oleva passi tai EUkansalaisen virallinen kuvallinen henkilökortti oleskelulupakortti tai muu mahdollinen todistus siitä että oleskelet laillisesti Suomessa unionin kansalaisen oleskeluoikeuden rekisteröintitodistus selvitys Suomessa tehtävästä työstä tai opiskelusta esim työsopimus tai opiskelutodistus tarvittaessa alkuperäiset laillistetut ja käännetyt todistukset perhesuhteista ja muut sellaiset asiakirjat joita Digi ja väestötietovirasto tarvitsee kun kirjaa tiedot väestötietojärjestelmään",
            "Muiden tietojen tallentaminen väestötietojärjestelmään Digi ja väestötietovirasto rekisteröi sinun perustietosi Suomen väestötietojärjestelmään Näitä tietoja ovat esimerkiksi nimi syntymäaika sukupuoli kansalaisuus syntymäpaikka äidinkieli ja osoite Lisäksi sinne voidaan merkitä tietoja esimerkiksi siviilisäädystä puolisosta lapsista ja vanhemmista Jos haluat että nämä tiedot rekisteröidään Suomen väestötietojärjestelmään sinun täytyy toimittaa Digi ja väestötietovirastoon asiaan liittyvät asiakirjat ja niiden liitteet Asiakirjan pitää olla alkuperäinen tai luotettavasti oikeaksi todistettu sekä tarpeen mukaan laillistettu ja käännetty",
            "Sinun pitää esittää Digi ja väestötietovirastolle alkuperäinen asiakirja tai kopio joka on luotettavasti oikeaksi todistettu Kopion voi luotettavasti oikeaksi todistaa asiakirjan antanut viranomainen itse tai kyseisen maan julkinen notaari Asiakirjan täytyy olla laillistettu jotta Digi ja väestötietovirasto voi merkitä tietosi väestötietojärjestelmään Jos maasi on liittynyt Haagin yleissopimukseen hae asiakirjallesi Apostilletodistus Et tarvitse Apostilletodistusta jos sinulla on yleinen asiakirja jonka on antanut jonkin EUmaan viranomainen Yleisen asiakirjan liitteeksi saatat kuitenkin tarvita käännösapuna käytettävää vakiolomaketta Näistä vakiolomakkeista voit tiedustella tarkemmin sen maan viranomaisilta josta todistusta haet Toinen vaihtoehto on että asiakirjan kääntää virallinen kääntäjä jonka jokin EUmaa on hyväksynyt Huomaa että asiakirjojen pitää olla suomen ruotsin tai englannin kielellä Jos asiakirjasi on jollain muulla kielellä sinun täytyy huolehtia siitä että se käännetään suomeksi ruotsiksi tai englanniksi Asiakirjan voi käännättää auktorisoidulla kielenkääntäjällä Jos käännös tehdään ulkomailla myös käännöksen pitää olla laillistettu Jos tarvitset lisää tietoa siitä miten voit laillistaa asiakirjat ole yhteydessä Digi ja väestötietovirastoon tai oman maasi ulkoministeriöön"
          ],
          "title": [
            "Asukkaaksi rekisteröityminen"
          ]
        }
      },
      {
        "_index": "first_finnish",
        "_type": "_doc",
        "_id": "entity:node/39430:fi",
        "_score": 1,
        "_ignored": [
          "field_text.keyword",
          "field_description.keyword"
        ],
        "_source": {
          "_language": "fi",
          "field_description": [
            "<p>  Kunnat tarjoavat asukkailleen monia palveluja Kunnan palveluja ovat esimerkiksi terveydenhuolto koulutus ja lasten varhaiskasvatus Jos sinulla on kotikunta Suomessa sinulla on tavallisesti oikeus käyttää tämän kunnan palveluja<p><p>  Sinun kannattaa selvittää onko sinulla ja muilla perheesi jäsenillä oikeus kotikuntaan Suomessa Oikeus kotikuntaan Suomessa määräytyy kotikuntalain mukaan Oman asuinpaikkasi Digi ja väestötietovirastosta voit selvittää onko sinulla oikeus kotikuntaan Suomessa<p><p>  Jotta voisit saada kotikunnan Suomesta sinun täytyy muuttaa Suomeen asumaan vakinaisesti Jos asut Suomessa tilapäisesti esimerkiksi muutat Suomeen opiskelun tai työn takia enintään yhdeksi vuodeksi et tavallisesti voi saada kotikuntaa Suomesta<p>"
          ],
          "field_text": [
            "Sinun on mahdollista saada kotikunta Suomesta jos olet Suomen kansalainen olet jonkin Pohjoismaan kansalainen olet EUmaan Sveitsin tai Liechtensteinin kansalainen ja olet rekisteröinyt oleskeluoikeutesi Suomessa sinulla on pysyvä P tai jatkuva A oleskelulupa joka on voimassa olet sellaisen henkilön perheenjäsen jolla on kotikunta Suomessa Jos sinulla on tilapäinen oleskelulupa Blupa joka on voimassa voit saada kotikunnan jos voit osoittaa että tarkoituksesi on asua Suomessa vakinaisesti Vakinaista asumista voivat osoittaa esimerkiksi seuraavat seikat sinulla on työpaikka Suomessa ja työsopimuksesi on voimassa vähintään kaksi vuotta opiskelet Suomessa ja opintosi kestävät vähintään kaksi vuotta olet suomalaista syntyperää sinulla on aikaisemmin ollut kotikunta Suomessa olet asunut Suomessa yhtäjaksoisesti vähintään yhden vuoden ajan Kotikuntasi on tavallisesti se kunta jossa asut Jos sinulla ei ole asuntoa tai sinulla on asuntoja monen kunnan alueella kotikuntasi on kunta jota itse pidät kotikuntanasi ja johon sinulla on jokin kiinteä yhteys esimerkiksi perhesuhteen tai työpaikan perusteella Jos haluat väestötietojärjestelmään merkittäväksi kotikunnan sinun tulee aina käydä henkilökohtaisesti Digi ja väestötietovirastossa Jos koko perheesi rekisteröidään kaikkien perheenjäsenten tulee käydä Digi ja väestötietovirastossa"
          ],
          "title": [
            "Kotikunta Suomessa"
          ]
        }
      },
      {
        "_index": "first_finnish",
        "_type": "_doc",
        "_id": "entity:node/39434:fi",
        "_score": 1,
        "_ignored": [
          "field_text.keyword",
          "field_description.keyword"
        ],
        "_source": {
          "_language": "fi",
          "field_description": [
            "<p>  Suomessa on erilaisia palveluita jotka auttavat sinua asettumaan työllistymään ja oppimaan kieltä Tällaisia palveluita ovat esimerkiksi alkukartoitus kotoutumissuunnitelma ja kotoutumiskoulutus Myös perheesi jäsenillä voi olla oikeus näihin palveluihin jos he muuttavat Suomeen sinun kanssasi<p>"
          ],
          "field_text": [
            "Perustietoa Suomesta Kaikilla maahanmuuttajilla on oikeus saada perustietoa Suomesta Kun saat oleskeluluvan tai rekisteröit oleskeluoikeutesi saat samalla kirjallisesti tietoa suomalaisesta yhteiskunnasta ja työelämästä oikeuksistasi ja velvollisuuksistasi palveluista jotka auttavat sinua kotoutumaan Maahanmuuttajien neuvonta Työ ja elinkeinotoimistoissa ja kunnissa on maahanmuuttajien neuvojia He auttavat sinua Suomeen kotoutumisessa Neuvojilta saat tietoa esimerkiksi kotoutumisesta ja palveluista jotka tukevat kotoutumista työelämästä koulutuksesta ja opiskelusta Alkukartoitus Alkukartoituksessa viranomainen arvioi kanssasi mitkä palvelut auttavat sinua kotoutumaan Alkukartoituksessa viranomainen selvittää esimerkiksi koulutuksesi työkokemuksesi ja kielitaitosi Työ ja elinkeinotoimisto tai kunta tekee alkukartoituksen Se voidaan tehdä myös jossakin muussa paikassa esimerkiksi oppilaitoksessa Tämä riippuu siitä missä kunnassa asut Voit pyytää esimerkiksi työ ja elinkeinotoimistosta tai kotikunnastasi että sinulle tehdään alkukartoitus Maahanmuuttajien neuvojilta saat lisätietoa alkukartoituksesta ja siitä miten se on järjestetty kotikunnassasi Kotoutumissuunnitelma Jos tarvitset tukea kotoutumisen viranomainen tekee sinun kanssasi sinulle alkukartoituksen jälkeen kotoutumissuunnitelman Kotoutumissuunnitelma tehdään ainakin silloin jos olet työtön työnhakija tai saat toimeentulotukea tai olet alle 18vuotias eikä sinulla ole huoltajaa Suomessa Kotoutumissuunnitelmaan kirjoitetaan niitä asioita jotka auttavat sinua kotoutumaan Suunnitelmaan voi kuulua esimerkiksi suomen kielen opiskelua muita opintoja tai työharjoittelua Voit tehdä kotoutumissuunnitelman TEtoimistossa yhdessä työvoimaneuvojan kanssa tai kotikuntasi työllisyyspalveluissa tai sosiaalitoimistossa Kotoutumissuunnitelma täytyy tehdä viimeistään kolmen vuoden kuluttua siitä kun saat ensimmäisen oleskeluluvan tai oleskeluoikeutesi on rekisteröity Kotoutumissuunnitelman kesto riippuu siitä kuinka kauan tarvitset tukea kotoutumisessa Kotoutumissuunnitelma on tavallisesti voimassa korkeintaan kolme vuotta Joissakin erityistapauksissa se voi olla voimassa viisi vuotta Kun sinulle on tehty kotoutumissuunnitelma on tärkeää että noudatat sitä TEtoimisto tai kunta ohjaa sinut tarvittaessa kotoutumiskoulutukseen Koulutukseen kuuluu suomen tai ruotsin kielen opiskelua sekä suomalaiseen yhteiskuntaan kulttuuriin ja työelämään tutustumista Lisäksi koulutukseen voi kuulua muita opintoja ja työharjoittelua TEtoimisto Kela tai kunta selvittää oikeutesi saada työttömyysetuutta tai toimeentulotukea kotoutumissuunnitelman ajalta Jos sinulla on työpaikka on joskus mahdollista että työnantajasi auttaa sinua kotoutumisessa Työnantaja voi esimerkiksi etsiä sinulle suomen kielen kurssin Kysy tästä lisää työnantajaltasi",
            "Kotoutumiskoulutus Kun kotoutumissuunnitelma on tehty voit saada kotoutumiskoulutusta Kotoutumiskoulutusta järjestävät erilaiset oppilaitokset Työ ja elinkeinotoimisto tai kunta ohjaa sinut kotoutumiskoulutukseen Kotoutumiskoulutukseen kuuluu tavallisesti suomen tai ruotsin kielen opiskelua Koulutuksessa tutustut myös suomalaiseen yhteiskuntaan kulttuuriin ja työelämään",
            "InfoFinlandin sivulta Suomen ja ruotsin kieli löydät tietoa suomen tai ruotsin kielen opiskelusta"
          ],
          "title": [
            "Kotoutuminen Suomeen"
          ]
        }
      },
      {
        "_index": "first_finnish",
        "_type": "_doc",
        "_id": "entity:node/39435:fi",
        "_score": 1,
        "_ignored": [
          "field_text.keyword"
        ],
        "_source": {
          "_language": "fi",
          "field_description": [
            "<p>  Kun muutat Suomeen listalla on monta käytännön asiaa jotka sinun täytyy hoitaa kuten pankkitili vakuutukset ja suomalainen puhelinliittymä Kokosimme sinulle tietopaketin tärkeimmistä asioista<p>"
          ],
          "field_text": [
            "Tarvitset pankkitilin rahaasioittesi hoitoon Sinun kannattaa vertailla eri pankkien palveluja ja hintoja jotta löydät itsellesi edullisimman vaihtoehdon Kun avaat pankkitilin tarvitset passin ulkomaalaisen henkilökortin tai muun virallisen henkilöllisyystodistuksen Jos sinulla ei ole passia tai ulkomaalaisen henkilökorttia sinun kannattaa tarkistaa minkä henkilöllisyystodistuksen pankki hyväksyy Jotkut pankit hyväksyvät muukalaispassin jonka suomalainen viranomainen on myöntänyt pakolaisen matkustusasiakirjan tai muun henkilöllisyystodistuksen joka voidaan hyväksyä matkustusasiakirjana Joissakin tilanteissa pankki voi vaatia myös muuta selvitystä henkilöllisyydestä jos asiakirjassasi on merkintä siitä että henkilöllisyyttäsi ei ole voitu varmistaa Et voi todistaa henkilöllisyyttäsi ajokortilla Kun avaat pankkitilin pankin täytyy lain mukaan pyytää selvitystä siitä mihin aiot käyttää tiliäsi Pankki saa myös tarkistaa luottotietosi Pankki tarvitsee sinulta seuraavat tiedot nimi henkilötunnus osoite Suomessa tai muussa maassa jos maksat veroja jonnekin muualle kuin Suomeen osoite tässä toisessa maassa samat tiedot niistä henkilöistä joilla on oikeus käyttää tiliä Kun avaat pankkitilin sinun kannattaa hakea myös verkkopankkitunnuksia Verkkopankkitunnusten avulla voit hoitaa esimerkiksi monia viranomaisasioita verkossa Tunnuksia koskevat kuitenkin tiukemmat vaatimukset kuin tilin avaamista Joissakin tilanteissa et siis voi saada verkkopankkitunnuksia vaikka sinulla on pankkitili Jos haluat kysyä neuvoa pankkiasioissa voit soittaa Vakuutus ja rahoitusneuvontaan Fine Palvelu on asiakkaalle maksutonta eli maksat vain puhelun hinnan Palvelukielet ovat suomi ruotsi ja englanti Vakuutus ja rahoitusneuvonta Mato klo 916 puh 09 6850 120 Lyhyitä ja yksinkertaisia kysymyksiä voi kysyä myös sähköpostitse suomeksi ruotsiksi tai englanniksi infoatfinefi",
            "Poliisi voi myöntää sinulle ulkomaalaisen henkilökortin jos sinut on tunnistettu ja henkilöllisyytesi on todennettu luotettavasti Henkilöllisyytesi voidaan todeta asiakirjasta joka osoittaa henkilöllisyyden Jos sinulla ei ole tällaista asiakirjaa voidaan verrata sinun sormenjälkiäsi sormenjälkiin jotka on tallennettu oleskelulupakortille tai oleskelukortille Lisäksi edellytetään että sinulla on oleskelulupa tai oleskelukortti joka on voimassa tai oleskeluoikeutesi on rekisteröity sinulla on kotikunta Suomessa ja tietosi on talletettu väestötietojärjestelmään Ulkomaalaisen henkilökortilla voit todistaa henkilöllisyytesi Suomessa Voit käyttää sitä esimerkiksi kun avaat pankkitilin Suomessa Et kuitenkaan voi käyttää sitä matkustusasiakirjana kun matkustat ulkomaille",
            "Asumista varten kannattaa ottaa kotivakuutus Kotivakuutus korvaa esimerkiksi vahinkoja jotka sattuvat huonekaluillesi ja muille tavaroillesi Yleensä vuokranantajat edellyttävät kotivakuutusta vuokraasunnossa Sinun kannattaa pyytää tarjousta monesta eri vakuutusyhtiöstä Jos sinulla on käytössä oma auto sinun täytyy lain mukaan ottaa liikennevakuutus Jos haluat ottaa henkilövakuutuksen suomalaisesta vakuutusyhtiöstä tarvitset yleensä suomalaisen Kelakortin Henkilövakuutuksia ovat esimerkiksi tapaturmavakuutus hoitokuluvakuutus ja henkivakuutus",
            "Kun ostat Suomessa puhelinliittymän saat suomalaisen puhelinnumeron Puhelinliittymiä tarjoavat monet yritykset Kun avaat liittymän tarvitset suomalaisen henkilötunnuksen ja sinulla täytyy olla osoite Suomessa Sinun täytyy yleensä myös esittää maksukäyttäytymistiedot eli tiedot siitä että olet maksanut laskusi eikä sinulla ole luottohäiriömerkintää Muuten sinun täytyy maksaa liittymästä ennakkomaksu Voit myös ostaa Prepaidliittymän Silloin et tarvitse suomalaista henkilötunnusta ja osoitetta Suomessa Prepaidkortille on etukäteen ladattu tietty summa jolla voit soittaa Prepaidliittymiä voit ostaa esimerkiksi Rkioskeista joistakin supermarketeista tai internetistä Kun soitat ulkomaille puhelimella kannattaa tarkistaa millä ulkomaantunnusnumerolla voit soittaa edullisimmin Useat yritykset tarjoavat edullisia ulkomaantunnuksia Huomaa että puhelun hinta riippuu kuitenkin aina siitä mihin maahan soitat Tarkista mikä on sinulle edullisin vaihtoehto",
            "Suomessa monet asiat voi hoitaa internetin välityksellä Usein viranomaisten tai yritysten kanssa voi hoitaa asioita niiden verkkosivujen kautta Internetyhteys kannattaa hankkia mahdollisimman pian kun olet muuttanut Suomeen Saat kotiisi internetyhteyden kun teet sopimuksen internetpalveluntarjoajan kanssa Palveluntarjoajien hintoja kannattaa vertailla ennen kuin teet sopimuksen Suomessa toimii paljon yrityksiä jotka tarjoavat monenlaisia internetyhteyksiä Näitä yrityksiä löydät esimerkiksi verkon hakukoneilla kun kirjoitat hakukoneen tekstikenttään internetliittymä Yhteyksien hinnat vaihtelevat paljon Internetiä voit myös käyttää kirjastoissa ilmaiseksi jos sinulla on kirjastokortti Kirjastokortin saa ilmaiseksi kirjastosta Lue lisää InfoFinlandin sivulta Kirjastot  Myös joissakin kahviloissa asiakkaiden on mahdollista käyttää internetiä",
            "Hintataso on Suomessa korkea Esimerkiksi ruoka ja monet palvelut maksavat Suomessa enemmän kuin Euroopassa keskimäärin Asumisen hinta vaihtelee paljon Suurissa kaupungeissa asuminen on paljon kalliimpaa kuin pienillä paikkakunnilla Lue lisää hinnoista ja muista elinkustannuksista Suomessa InfoFinlandin sivulta Hintataso Suomessa ",
            "Jokainen joka ostaa tavaroita tai palveluja on kuluttaja Kuluttajansuojalaki turvaa kuluttajan oikeudet Suomessa Jos ostat tavaran jossa on vikoja joita et ole itse aiheuttanut sinulla on oikeus saada hyvitystä Voit esimerkiksi saada tilalle tavaran jossa ei ole virheitä tai voit saada rahasi takaisin Jos olet ostanut tavaran jossa on puutteita ota ensin yhteyttä tavaran myyjään Jos et voi sopia asiaa myyjän kanssa ota yhteyttä kuluttajaneuvontaan",
            "Julkinen liikenne toimii Suomessa hyvin Junalla ja linjaautolla voi matkustaa melkein kaikkialle Suomessa Moniin kaupunkeihin pääsee myös lentämällä Suurissa kaupungeissa ja niiden lähellä on myös hyvin toimiva paikallisliikenne Paikallisliikenne toimii tavallisesti busseilla Lue lisää InfoFinlandin sivulta Liikenne Suomessa ",
            "Suomessa voit suorittaa ajokortin jos olet täyttänyt 18 vuotta Jos sinulla on ajokortti jostakin muusta maasta riippuu tilanteesta miten sinun kannattaa toimia Lue lisää InfoFinlandin sivulta Liikenne Suomessa ",
            "Suomen ilmasto on kylmempi kuin monissa muissa maissa Suomessa keskilämpötila on talvella nollan Celsiusasteen alapuolella ja kesällä +10 Celsiusasteen yläpuolella Kevään ja syksyn lämpötilat asettuvat tälle välille Talvella Suomessa kannattaa pukeutua lämpimästi Lue lisää Suomen ilmastosta InfoFinlandin sivulta Suomen ilmasto ",
            "Suomessa ilmestyy lähes 200 sanomalehteä Suomessa näkyy neljä julkista televisiokanavaa ja monia kaupallisia televisiokanavia Lue lisää InfoFinlandin sivulta Media Suomessa ",
            "Tietoa suomalaisesta kulttuurista saat InfoFinlandin sivuilta Suomalainen tapakulttuuri ja Suomalainen työkulttuuri  Sivulla Suomalaiset juhlapyhät on tietoa niistä juhlista joita Suomessa vietetään"
          ],
          "title": [
            "Arkielämä Suomessa"
          ]
        }
      },
      {
        "_index": "first_finnish",
        "_type": "_doc",
        "_id": "entity:node/39442:fi",
        "_score": 1,
        "_ignored": [
          "field_text.keyword"
        ],
        "_source": {
          "_language": "fi",
          "field_text": [
            "Suomen kansalaisuuteen liittyy joitakin oikeuksia ja velvollisuuksia joita Suomessa asuvilla ulkomaalaisilla ei välttämättä ole Oikeudet oikeus saada Suomen passi oikeus saapua Suomeen ja kieltäytyä luovutuksesta toiseen maahan oikeus äänestää presidentin vaalissa eduskuntavaaleissa ja kansanäänestyksissä jos on täyttänyt 18 vuotta oikeus asettua ehdokkaaksi eduskuntavaaleissa jos on täyttänyt 18 vuotta mahdollisuus tulla valituksi sellaisiin valtion virkoihin joihin täytyy olla Suomen kansalaisuus EUkansalaisen oikeudet kuten vapaa liikkuminen ja työnteko EUn alueella ja oikeus äänestää ja asettua ehdokkaaksi EUvaaleissa Velvollisuudet velvollisuus osallistua maanpuolustamiseen tai avustaa siinä Vähintään 18vuotiailla miehillä on asevelvollisuus velvollisuus noudattaa Suomen lakeja myös muualla kuin Suomessa Suomen kansalainen voidaan tuomita Suomessa rikoksesta joka on tehty ulkomailla Huomaa että nämä ovat Suomen kansalaisuuteen liittyviä oikeuksia ja velvollisuuksia Oikeuksista ja velvollisuuksista jotka koskevat kaikkia Suomen asukkaita saat tietoa InfoFinlandin sivulta Oikeutesi ja velvollisuutesi Suomessa "
          ],
          "title": [
            "Suomen kansalaisen oikeudet ja velvollisuudet"
          ]
        }
      }
    ]
  }
}


export default ELASTIC_MOCK
