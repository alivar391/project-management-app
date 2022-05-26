import { useTranslation } from 'react-i18next';
import './welcomePage.css';
export function WelcomePage() {
  const { t } = useTranslation();
  return (
    <div className="welcome__page-bg">
      <div className="welcome__page">
        <h1 className="welcome__title">{t('welcomePage.Productivity Planner')}</h1>
        <h3 className="welcome__subtitle">
          {t('welcomePage.Set goals and actually conquer them')}
        </h3>
        <div className="welcome__desc">{t('welcomePage.description')}</div>
        <div className="welcome__rs-info">
          <h2 className="welcome__rs-info-title">
            {t('welcomePage.RSS.Online course Development with React')}
          </h2>
          <h3 className="welcome__rs-info-subtitle">
            {t('welcomePage.RSS.Free course from The Rolling Scopes community')}
          </h3>
          <a
            href="https://wearecommunity.io/events/react-rss-2022q1"
            className="btn welcome__rs-info-btn"
          >
            {t('signInPage.Sign Up')}
          </a>
          <h4>{t('welcomePage.RSS.Who is this course for?')}</h4>
          <p className="rss-event">
            {t(
              'welcomePage.RSS.The course is intended for RS School 2021Q3 students who have passed RS School stage #2, as well as for new students who have knowledge and practical experience in using the following technologies and tools'
            )}{' '}
            <span className="rss-bold">
              JavaScript, TypeScript, Git, GitHub, NPM, Webpack, CSS3 / HTML5, Chrome DevTools,
              Figma, REST API.
            </span>
          </p>
          <div className="rss-advantages">
            <div className="rss-advantage__card">
              <h5 className="">Free education</h5>
              <div className="rss-info__block">
                <div className="rss-icon rss-free"></div>
                <p>
                  The principle of &quot;Pay it forward&quot; works at RS School. We share our
                  knowledge with students for free now, hoping that in the future they will return
                  to us as mentors and pass on their knowledge to the next generation of students in
                  the same way.
                </p>
              </div>
            </div>
            <div className="rss-advantage__card">
              <h5>Training term: 2 months</h5>
              <div className="rss-info__block">
                <div className="rss-icon rss-time"></div>
                <p>
                  Webinars are held 2 times a week in the evening. A recording of the webinars will
                  be available on the school&lsquo;s YouTube channel.
                </p>
              </div>
            </div>
            <div className="rss-advantage__card">
              <h5>For everyone</h5>
              <div className="rss-info__block">
                <div className="rss-icon rss-everyone"></div>
                <p>
                  Everyone can study at RS School, regardless of age, professional employment and
                  place of residence. However, for successful learning, you need to have basic
                  knowledge.
                </p>
              </div>
            </div>
            <div className="rss-advantage__card">
              <h5>Certificate</h5>
              <div className="rss-info__block">
                <div className="rss-icon rss-certificate"></div>
                <p>
                  A certificate of successful completion of the course is issued to all who have
                  passed the two stages of training.
                </p>
              </div>
            </div>
            <div className="rss-advantage__card">
              <h5>Materials</h5>
              <div className="rss-info__block">
                <div className="rss-icon rss-materials"></div>
                <p>
                  All materials will be hosted in the public domain on
                  <a href="https://www.youtube.com/c/RollingScopesSchool"> YouTube</a> and
                  <a href="https://github.com/rolling-scopes-school/"> GitHub.</a>
                </p>
              </div>
            </div>
            <div className="rss-advantage__card">
              <h5>Chat</h5>
              <div className="rss-info__block">
                <div className="rss-icon rss-chat"></div>
                <p>
                  Open chat for applicants and students:
                  <a href="https://discord.gg/zyRcphs3px"> https://discord.gg/zyRcphs3px</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="welcome__about">
          <h3 className="welcome__subtitle">{t('welcomePage.About us')}</h3>
          <div className="cards__teams">
            <div className="card__team">
              <img className="card__team-img" src="./assets/jpg/anton-png.png" alt="team-anton" />
              <div className="team__info">
                <h6>{t('welcomePage.Anton Tananka')}</h6>
                <p>{t('welcomePage.Team-lead')}</p>
                <a href="https://alivar391.github.io/rsschool-cv/">{t('welcomePage.More in CV')}</a>
              </div>
            </div>
            <div className="card__team">
              <img className="card__team-img" src="./assets/jpg/diana-png.png" alt="team-diana" />
              <div className="team__info">
                <h6>{t('welcomePage.Diana Byben')}</h6>
                <p>{t('welcomePage.Frontend Developer')}</p>
                <a href="https://dianabyben-cv.netlify.app">{t('welcomePage.More in CV')}</a>
              </div>
            </div>
            <div className="card__team">
              <img
                className="card__team-img"
                src="./assets/jpg/anastasia-png.png"
                alt="team-anastasia"
              />
              <div className="team__info">
                <h6>{t('welcomePage.Anastasia Arzhanik')}</h6>
                <p>{t('welcomePage.Frontend Developer')}</p>
                <a href="https://arzhanik-anastasia.github.io/rsschool-cv/">
                  {t('welcomePage.More in CV')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
