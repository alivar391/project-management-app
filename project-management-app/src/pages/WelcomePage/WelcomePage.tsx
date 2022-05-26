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
                <a href="https://dianabyben-cv.netlify.app/portfolio">
                  {t('welcomePage.More in CV')}
                </a>
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
