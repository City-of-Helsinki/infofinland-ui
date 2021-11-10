import Head from 'next/head'
import Article from '../components/article/Article'
import Layout from '../components/layout/Layout'
// import ParseHtml from '../components/ParseHtml'
import LocalInformation from '../components/cities/LocalInformation'
import Block from '../components/article/Block'
import ReadMoreBlock from '../components/article/ReadMoreBlock'

const ArticlePage = ({
  title,
  // body,
  ...articleProps
}) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Article title={title} {...articleProps}>
        <Block className="my-8 ifu-article__bodyblock">
          <p className="mb-4">
            Vocational education and training are very practically-oriented and
            provide the student with the necessary skills for working life. The
            education and training are intended for young people completing
            their basic education and for adults who are already working. After
            vocational education and training, you can start working or apply to
            a higher education institute.
          </p>
          <p className="mb-4">
            In vocational education and training, you can study the following
            fields:
          </p>
          <ul>
            <li>education</li>
            <li>humanities and the arts</li>
            <li>social sciences</li>
            <li>business and administration</li>
            <li>natural sciences</li>
            <li>engineering</li>
            <li>agriculture and forestry</li>
            <li>health and wellness</li>
            <li>services.</li>
          </ul>
          <p className="mb-4">
            In addition to vocational education and training, you can also apply
            to upper secondary school after comprehensive school. You can also
            complete a double degree by studying at a vocational institute and
            upper secondary school at the same time. Read more about upper
            secondary schools on the InfoFinland page{' '}
            <a href="/en/living-in-finland/education/after-comprehensive-school/upper-secondary-school">
              Upper secondary school
            </a>
            .
          </p>
        </Block>
        <ReadMoreBlock />
        <Block className="my-8 ifu-article__bodyblock">
          <h2>Studying in vocational education and training</h2>
          <p className="mb-4">
            At the beginning of your studies, a personal competence development
            plan (HOKS) is drawn up for you. The plan includes a list of the
            skills you already have, as well as what and how you will study
            further. The plan will also indicate what support you need during
            your studies.
          </p>
          <p className="mb-4">
            In vocational education and training, studying is flexible. You move
            at your own pace and study time is influenced, for example, by
            whether you have previously acquired learning and how quickly you
            learn new things. You can complete studies in different ways and in
            different environments. You can study, for example, at the
            workplace, at an educational institute or online. You can complete
            an entire qualification or only parts of the qualification.
          </p>
          <p className="mb-4">
            In vocational education and training, you demonstrate your skills
            and complete parts of the qualification mainly in demonstrations. In
            demonstrations, you do practical work assignments in real work
            situations at a workplace. Two evaluators assess how well you have
            achieved the professional skills required for the degree.
          </p>
        </Block>
        <ReadMoreBlock />

        <Block className="my-8 ifu-article__bodyblock">
          <h2>Applying for vocational education and training</h2>
          <p className="mb-4">
            You can apply for vocational education and training in Finland after
            you have completed the comprehensive school syllabus or have
            acquired the corresponding skills in other ways. The education
            provider assesses whether the applicant’s skills are sufficient to
            complete the qualification.
          </p>
          <p className="mb-4">
            You can apply for a vocational upper secondary qualification through
            the continuous application process throughout the year or through
            the upper secondary level joint application process February-March.
            The joint application process is primarily intended for those who
            are graduating comprehensive school. Application for a vocational
            qualification or a specialist vocational qualification is always
            through the continuous application process.
          </p>
          <p className="mb-4">
            Read more on the InfoFinland page{' '}
            <a href="/en/living-in-finland/education/joint-application-and-entrance-exams">
              Applying for education and training
            </a>
            .
          </p>
        </Block>
        <ReadMoreBlock />
        <Block className="my-8 ifu-article__bodyblock">
          <h2>Vocational qualifications</h2>
          <p className="mb-4">
            You can complete a vocational upper secondary qualification,
            vocational qualification or specialised vocational qualification.
          </p>
          <h3>Vocational upper secondary qualification</h3>
          <p className="mb-4">
            A vocational upper secondary qualification provides the basic skills
            required in the field. Completing a comprehensive school-based
            qualification takes roughly three years. All upper secondary
            qualifications include some common studies, such as communication
            and interaction skills, mathematics and natural sciences, and social
            and working life skills.
          </p>
          <h3>Vocational qualification</h3>
          <p className="mb-4">
            A vocational qualification is more in-depth than a vocational upper
            secondary qualification. It is usually carried out alongside work or
            through apprenticeship. Apply for a vocational qualification if you
            already have basic training in the field or skills acquired at work.
          </p>
          <h3>Specialist vocational qualification</h3>
          <p className="mb-4">
            In a specialist vocational qualification, you acquire even more
            advanced competence. A graduate with a specialist vocational
            qualification can complete the most demanding jobs in the field. You
            can apply for a specialist vocational qualification if you have
            completed basic training or other studies in the field and have
            worked in the field for several years.
          </p>
          <h2>On-the-job learning</h2>
          <p className="mb-4">
            During studies, it is possible to combine different learning
            environments and ways to study. You can complete an entire
            qualification or parts of it flexibly at the workplace in practical
            work tasks. On-the-job learning is agreed through apprenticeships or
            training agreements.
          </p>
          <h3>Apprenticeship</h3>
          <p className="mb-4">
            Apprenticeship (oppisopimus) means learning through working. You
            work in your own field and study alongside work. Any vocational
            upper secondary qualification or parts of it can be completed
            through apprenticeship. An apprenticeship often also involves
            studying at an educational institute.
          </p>
          <p className="mb-4">
            If you are interested in studying with an apprenticeship, contact
            the advisory service of your preferred educational institute. You
            will receive help finding an apprenticeship place at the educational
            institute and TE Office. You can also agree on an apprenticeship
            with your current workplace.
          </p>
          <p className="mb-4">
            At work, you will be guided by a workplace instructor, who can be
            your supervisor or another employee at the workplace. The employer
            will pay you at least internship wages. If you do not receive pay
            for time spent on theoretical studies, you may be entitled to apply
            for daily allowance, travel allowance and family allowance. You may
            receive them if you are covered by Finnish social security. Ask for
            more information at your educational establishment.
          </p>
        </Block>
        <ReadMoreBlock />
        <Block className="my-8 ifu-article__bodyblock">
          <h3>Education agreement</h3>
          <p className="mb-4">
            Training agreement (koulutussopimus) is also on-the-job learning. A
            training agreement allows you to complete parts of a qualification.
            The student is not employed and receives no salary during the
            training.
          </p>
        </Block>
        <ReadMoreBlock />

        <Block className="my-8 ifu-article__bodyblock">
          <h2>Preparatory vocational education</h2>
          <p className="mb-4">
            VALMA is preparatory vocational education. VALMA education enables
            you to strengthen the skills and knowledge that you need in
            vocational education and training.
          </p>
          <p className="mb-4">
            During VALMA education, you can improve your language skills and
            your comprehensive school certificate. VALMA education takes one
            school year. During the year, you will have the opportunity to
            familiarise yourself with various fields and consider what you would
            like to study.
          </p>
          <p className="mb-4">
            Once completed, you will obtain a certificate of your VALMA
            education. When you later apply for upper secondary vocational
            education through the joint application system, you can get extra
            points for completed preparatory education. VALMA education is
            normally free of charge for students.
          </p>
          <p className="mb-4">
            You can apply for VALMA education if you have completed
            comprehensive school or comparable education. If the educational
            institution is of the opinion that you can successfully complete
            your VALMA education, you can be accepted as a student even if you
            do not have a comprehensive education leaving certificate
          </p>
          <p className="mb-4">
            Apply for VALMA education in the search for preparatory education
            after comprehensive education. You can find the application periods
            and application form for VALMA education from the Studyinfo.fi
            service.
          </p>
        </Block>
        <ReadMoreBlock />
        <LocalInformation readMoreUrl={'/test'} />
        <ReadMoreBlock />
      </Article>
    </Layout>
  )
}

export default ArticlePage
