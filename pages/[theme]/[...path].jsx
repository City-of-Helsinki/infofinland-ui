import ArticlePage from '../../src/page-templates/ArticlePage'
import heroImage from '../../public/images/article1-sm.png'
// import {
//   getPathsFromContext,
//   getResourceFromContext,
//   getResourceCollectionFromContext,
//   getResourceTypeFromContext,
//   getMenu,
// } from 'next-drupal'
const body = `<p>
Vocational education and training are very practically-oriented and provide the student with the necessary skills for working life. The education and training are intended for young people completing their basic education and for adults who are already working. After vocational education and training, you can start working or apply to a higher education institute.</p><p>
In vocational education and training, you can study the following fields:</p><ul><li>
  education</li><li>
  humanities and the arts</li><li>
  social sciences</li><li>
  business and administration</li><li>
  natural sciences</li><li>
  engineering</li><li>
  agriculture and forestry</li><li>
  health and wellness</li><li>
  services.</li></ul><p>
In addition to vocational education and training, you can also apply to upper secondary school after comprehensive school. You can also complete a double degree by studying at a vocational institute and upper secondary school at the same time. Read more about upper secondary schools on the InfoFinland page <a href="/en/living-in-finland/education/after-comprehensive-school/upper-secondary-school">Upper secondary school</a>.</p>
<span class="normal langversions"><span class="linkarrow">
<a href="https://opintopolku.fi/wp/fi/ammatillinen-koulutus/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Studyinfo.fi:</span><br><span class="doctitle">Basic information on vocational education</span><span class="linklanguages"><a href="https://opintopolku.fi/wp/fi/ammatillinen-koulutus/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">Finnish</a> | <a href="https://studieinfo.fi/wp/yrkesutbildning/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studieinfo.fi');" class="outerlink">Swedish</a> | <a href="https://studyinfo.fi/wp2/en/vocational-education-and-training/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studyinfo.fi');" class="outerlink">English</a></span></span></p><p><span class="normal langversions"><span class="linkarrow"><a href="https://www.oph.fi/fi/koulutus-ja-tutkinnot/ammatillinen-koulutus" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Finnish National Agency for Education:</span><br><span class="doctitle">Further information on vocational education</span><span class="linklanguages"><a href="https://www.oph.fi/fi/koulutus-ja-tutkinnot/ammatillinen-koulutus" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">Finnish</a> | <a href="https://www.oph.fi/sv/utbildning-och-examina/yrkesutbildning" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">Swedish</a> | <a href="https://www.oph.fi/en/education-system/finnish-vocational-education-and-training" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">English</a></span></span>

<span class="normal langversions"><span class="linkarrow"><a href="https://opintopolku.fi/wp/fi/ammatillinen-koulutus/mita-ammatillisessa-voi-opiskella/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Studyinfo.fi:</span><br><span class="doctitle">Fields of study in vocational education and training</span><span class="linklanguages"><a href="https://opintopolku.fi/wp/fi/ammatillinen-koulutus/mita-ammatillisessa-voi-opiskella/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">Finnish</a> | <a href="https://studieinfo.fi/wp/yrkesutbildning/vad-kan-jag-studera-inom-yrkesutbildning/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studieinfo.fi');" class="outerlink">Swedish</a> | <a href="https://studyinfo.fi/wp2/en/vocational-education-and-training/fields-of-vocational-education-and-training/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studyinfo.fi');" class="outerlink">English</a></span></span>
<h2>
Studying in vocational education and training</h2><p>
At the beginning of your studies, a personal competence development plan (HOKS) is drawn up for you. The plan includes a list of the skills you already have, as well as what and how you will study further. The plan will also indicate what support you need during your studies.</p><p>
In vocational education and training, studying is flexible. You move at your own pace and study time is influenced, for example, by whether you have previously acquired learning and how quickly you learn new things. You can complete studies in different ways and in different environments. You can study, for example, at the workplace, at an educational institute or online. You can complete an entire qualification or only parts of the qualification.</p><p>
In vocational education and training, you demonstrate your skills and complete parts of the qualification mainly in demonstrations. In demonstrations, you do practical work assignments in real work situations at a workplace. Two evaluators assess how well you have achieved the professional skills required for the degree.</p>

<span class="normal langversions"><span class="linkarrow"><a href="https://www.oph.fi/fi/koulutus-ja-tutkinnot/tyoelamassa-oppiminen#anchor-naytto" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Finnish National Agency for Education:</span><br><span class="doctitle">Information on demonstrations</span><span class="linklanguages"><a href="https://www.oph.fi/fi/koulutus-ja-tutkinnot/tyoelamassa-oppiminen#anchor-naytto" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">Finnish</a> | <a href="https://www.oph.fi/sv/utbildning-och-examina/larande-i-arbetslivet#anchor-yrkesprov" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">Swedish</a></span></span>

<h2>
Applying for vocational education and training</h2><p>
You can apply for vocational education and training in Finland after you have completed the comprehensive school syllabus or have acquired the corresponding skills in other ways. The education provider assesses whether the applicant’s skills are sufficient to complete the qualification.</p><p>
You can apply for a vocational upper secondary qualification through the continuous application process throughout the year or through the upper secondary level joint application process February-March. The joint application process is primarily intended for those who are graduating comprehensive school. Application for a vocational qualification or a specialist vocational qualification is always through the continuous application process.</p><p>
Read more on the InfoFinland page <a href="/en/living-in-finland/education/joint-application-and-entrance-exams">Applying for education and training</a>.</p>


<span class="normal langversions"><span class="linkarrow"><a href="https://opintopolku.fi/wp/fi/ammatillinen-koulutus/nain-haet-kevaan-yhteishaussa-ammatilliseen/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Studyinfo.fi:</span><br><span class="doctitle">Applying for vocational education and training in the joint application process</span><span class="linklanguages"><a href="https://opintopolku.fi/wp/fi/ammatillinen-koulutus/nain-haet-kevaan-yhteishaussa-ammatilliseen/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">Finnish</a> | <a href="https://studieinfo.fi/wp/yrkesutbildning/sa-har-soker-du-i-varens-gemensamma-ansokan-till-yrkesutbildning/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studieinfo.fi');" class="outerlink">Swedish</a> | <a href="https://studyinfo.fi/wp2/en/general-upper-secondary-education/applying/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studyinfo.fi');" class="outerlink">English</a></span></span>
<span class="normal langversions"><span class="linkarrow"><a href="https://opintopolku.fi/wp/ammatillinen-koulutus/jatkuva-haku-ammatilliseen-koulutukseen/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Studyinfo.fi:</span><br><span class="doctitle">Continuous application process for vocational education and training </span><span class="linklanguages"><a href="https://opintopolku.fi/wp/ammatillinen-koulutus/jatkuva-haku-ammatilliseen-koulutukseen/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">Finnish</a> | <a href="https://studieinfo.fi/wp/yrkesutbildning/kontinuerlig-ansokan-till-yrkesutbildning/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studieinfo.fi');" class="outerlink">Swedish</a></span></span>
<span class="normal langversions"><span class="linkarrow"><a href="https://opintopolku.fi/wp/ammatillinen-koulutus/ammatillisen-koulutuksen-valintaperusteet-yhteishaussa/harkintaan-perustuva-valinta/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Studyinfo.fi:</span><br><span class="doctitle">Admission based on the education provider's discretion</span><span class="linklanguages"><a href="https://opintopolku.fi/wp/ammatillinen-koulutus/ammatillisen-koulutuksen-valintaperusteet-yhteishaussa/harkintaan-perustuva-valinta/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">Finnish</a> | <a href="https://studieinfo.fi/wp/yrkesutbildning/antagningsgrunder-till-yrkesutbildning/antagning-enligt-provning/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studieinfo.fi');" class="outerlink">Swedish</a></span></span>
<h2>
Vocational qualifications</h2><p>
You can complete a vocational upper secondary qualification, vocational qualification or specialised vocational qualification.</p><h3>
Vocational upper secondary qualification</h3><p>
A vocational upper secondary qualification provides the basic skills required in the field. Completing a comprehensive school-based qualification takes roughly three years. All upper secondary qualifications include some common studies, such as communication and interaction skills, mathematics and natural sciences, and social and working life skills.</p><h3>
Vocational qualification</h3><p>
A vocational qualification is more in-depth than a vocational upper secondary qualification. It is usually carried out alongside work or through apprenticeship. Apply for a vocational qualification if you already have basic training in the field or skills acquired at work.</p><h3>
Specialist vocational qualification</h3><p>
In a specialist vocational qualification, you acquire even more advanced competence. A graduate with a specialist vocational qualification can complete the most demanding jobs in the field. You can apply for a specialist vocational qualification if you have completed basic training or other studies in the field and have worked in the field for several years.</p><h2>
On-the-job learning</h2><p>
During studies, it is possible to combine different learning environments and ways to study. You can complete an entire qualification or parts of it flexibly at the workplace in practical work tasks. On-the-job learning is agreed through apprenticeships or training agreements.</p><h3>
Apprenticeship</h3><p>
Apprenticeship (oppisopimus) means learning through working. You work in your own field and study alongside work. Any vocational upper secondary qualification or parts of it can be completed through apprenticeship. An apprenticeship often also involves studying at an educational institute.</p><p>
If you are interested in studying with an apprenticeship, contact the advisory service of your preferred educational institute. You will receive help finding an apprenticeship place at the educational institute and TE Office. You can also agree on an apprenticeship with your current workplace.</p><p>
At work, you will be guided by a workplace instructor, who can be your supervisor or another employee at the workplace. The employer will pay you at least internship wages. If you do not receive pay for time spent on theoretical studies, you may be entitled to apply for daily allowance, travel allowance and family allowance. You may receive them if you are covered by Finnish social security. Ask for more information at your educational establishment.</p>

<span class="normal langversions"><span class="linkarrow"><a href="https://opintopolku.fi/wp/oppisopimus/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Studyinfo.fi:</span><br><span class="doctitle">Information on apprenticeship training</span><span class="linklanguages"><a href="https://opintopolku.fi/wp/oppisopimus/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">Finnish</a> | <a href="https://studieinfo.fi/wp/laroavtal/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studieinfo.fi');" class="outerlink">Swedish</a></span></span>
<span class="normal langversions"><span class="linkarrow"><a href="https://www.oppisopimus.fi/opiskelijalle/oppisopimuskoulutus/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oppisopimus.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Oppisopimus.fi:</span><br><span class="doctitle">Information on apprenticeship training</span><span class="linklanguages"><a href="https://www.oppisopimus.fi/opiskelijalle/oppisopimuskoulutus/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oppisopimus.fi');" class="outerlink">Finnish</a> | <a href="https://www.oppisopimus.fi/sv/studerande/laroavtalsutbildning/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oppisopimus.fi');" class="outerlink">Swedish</a> | <a href="https://www.oppisopimus.fi/en/student/apprenticeship-training/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oppisopimus.fi');" class="outerlink">English</a></span></span>
<span class="normal langversions"><span class="linkarrow"><a href="https://www.oph.fi/fi/koulutus-ja-tutkinnot/tyoelamassa-oppiminen#anchor-oppisopimuskoulutus" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Finnish National Agency for Education:</span><br><span class="doctitle">Information on apprenticeship training</span><span class="linklanguages"><a href="https://www.oph.fi/fi/koulutus-ja-tutkinnot/tyoelamassa-oppiminen#anchor-oppisopimuskoulutus" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">Finnish</a> | <a href="https://www.oph.fi/sv/utbildning-och-examina/larande-i-arbetslivet#anchor-laroavtalsutbildning" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">Swedish</a></span></span><h3>
Education agreement</h3><p>
Training agreement (koulutussopimus) is also on-the-job learning. A training agreement allows you to complete parts of a qualification. The student is not employed and receives no salary during the training.</p>
<span class="normal langversions"><span class="linkarrow"><a href="https://www.oph.fi/fi/koulutus-ja-tutkinnot/tyoelamassa-oppiminen#anchor-koulutussopimukseen-perustuva-koulutus" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">The Finnish National Agency for Education:</span><br><span class="doctitle">Information on training agreements</span><span class="linklanguages"><a href="https://www.oph.fi/fi/koulutus-ja-tutkinnot/tyoelamassa-oppiminen#anchor-koulutussopimukseen-perustuva-koulutus" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">Finnish</a> | <a href="https://www.oph.fi/sv/utbildning-och-examina/larande-i-arbetslivet#122f5525" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'oph.fi');" class="outerlink">Swedish</a></span></span><h2>
Preparatory vocational education</h2><p>
VALMA is preparatory vocational education. VALMA education enables you to strengthen the skills and knowledge that you need in vocational education and training.</p><p>
During VALMA education, you can improve your language skills and your comprehensive school certificate. VALMA education takes one school year. During the year, you will have the opportunity to familiarise yourself with various fields and consider what you would like to study.</p><p>
Once completed, you will obtain a certificate of your VALMA education. When you later apply for upper secondary vocational education through the joint application system, you can get extra points for completed preparatory education. VALMA education is normally free of charge for students.</p><p>
You can apply for VALMA education if you have completed comprehensive school or comparable education. If the educational institution is of the opinion that you can successfully complete your VALMA education, you can be accepted as a student even if you do not have a comprehensive education leaving certificate</p><p>
Apply for VALMA education in the search for preparatory education after comprehensive education. You can find the application periods and application form for VALMA education from the Studyinfo.fi service.</p>
<span class="normal langversions"><span class="linkarrow"><a href="https://opintopolku.fi/wp/ammatillinen-koulutus/%ef%bb%bfammatilliseen-peruskoulutukseen-valmentava-koulutus/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Studyinfo.fi:</span><br><span class="doctitle">Information on VALMA education</span><span class="linklanguages"><a href="https://opintopolku.fi/wp/ammatillinen-koulutus/%ef%bb%bfammatilliseen-peruskoulutukseen-valmentava-koulutus/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">Finnish</a> | <a href="https://studieinfo.fi/wp/yrkesutbildning/utbildning-som-handleder-for-grundlaggande-yrkesutbildning/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studieinfo.fi');" class="outerlink">Swedish</a> | <a href="https://studyinfo.fi/wp2/en/vocational-education-and-training/preparatory-education-for-vocational-education/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studyinfo.fi');" class="outerlink">English</a></span></span>
<span class="normal langversions"><span class="linkarrow"><a href="https://opintopolku.fi/wp/valintojen-tuki/yhteishaku/haku-kesalla-perusopetuksen-jalkeisiin-valmistaviin-koulutuksiin/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">linkki</a></span><span class="linkorganisation">Studyinfo.fi:</span><br><span class="doctitle">Applying for VALMA education</span><span class="linklanguages"><a href="https://opintopolku.fi/wp/valintojen-tuki/yhteishaku/haku-kesalla-perusopetuksen-jalkeisiin-valmistaviin-koulutuksiin/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'opintopolku.fi');" class="outerlink">Finnish</a> | <a href="https://studieinfo.fi/wp/stod-for-studievalet/gemensam-ansokan/ansokan-pa-sommaren-till-handledande-utbildningar-efter-grundlaggande-utbildning/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studieinfo.fi');" class="outerlink">Swedish</a> | <a href="https://studyinfo.fi/wp2/en/general-upper-secondary-education/preparatory-education-for-general-upper-secondary/" target="_blank" onclick="ga('send', 'event', 'Exit Links', 'Click', 'studyinfo.fi');" class="outerlink">English</a></span></span>
`
export const PROPS = {
  breadcrumbs: [
    { text: 'Living', url: '/' },
    { text: 'Health and other things', url: '/' },
    { text: 'Health services in Finland', url: '/' },
  ],
  heroImage,
  body,
  title: 'Vocational education and training',
  color: 'orange',
  date: '23.12.2015',
  category: 'Health and other things',
}

// export async function getStaticPaths(context) {
//   const paths =  await getPathsFromContext(["node--article", "node--page"], context)
//   return {
//     paths,
//     fallback: true,
//   }
// }

export async function getServerSideProps() {
  // context
  // const { tree, items } = await getMenu("testmenu")
  // let url = null;
  // if(context){ url = context.req.rawHeaders.find((h) => /^http:/.test(h))}

  return { props: PROPS }

  //   const type = await getResourceTypeFromContext(context)
  //   if (!type) {
  //     return {
  //       notFound: true,
  //     }
  //   }

  //   let params = {}
  //   if (type === "node--article") {
  //     params = {
  //       include: "field_image,uid",
  //     }
  //   }

  //   const node = await getResourceFromContext(type, context, {
  //     params,
  //   })
  //   if (!node?.status) {
  //     return {
  //       notFound: true,
  //     }
  //   }

  //   return {
  //     props: {
  //       preview: context.preview || false,
  //       node,
  //     },
  //     revalidate: 60,
  //   }
}

// export async function getServerSideProps() {
//   return { props: PROPS }
// }

//   return {props}
// export async function getStaticProps(context) {

//   const props = {
//     breadcrumbs:[
//       { text: 'Living', url: '/' },
//       { text: 'Health and other things', url: '/' },
//       { text: 'Health services in Finland', url: '/' },
//     ],
//     heroImage,
//     body,
//     title:'Health services in Finlande',
//     color:'red',
//     date:'23.12.2015',
//     category:'Health and other things'
//   }

//   return {props}

// }

// export async function getStaticPaths() {

//   return {paths:[
//     { params: { theme:'theme',page:'foo', subpage: 'bar' } },
//   ],
//   fallback:true
// }

// }

export default ArticlePage
