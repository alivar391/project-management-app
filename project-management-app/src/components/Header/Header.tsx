import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './header.css';
import { useTranslation } from 'react-i18next';

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.userInfo.token.token);
  const userName = useAppSelector((state) => state.userInfo.userInfo.login);
  const [scroll, setScroll] = useState(false);
  const changeStyle = () => {
    if (window.scrollY >= 70) {
      setScroll(true);
    } else if (window.scrollY < 40) {
      setScroll(false);
    }
  };
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const logoutUser = () => {
    dispatch(setToken({ token: null }));
    navigate('/welcome', { replace: true });
  };

  window.addEventListener('scroll', changeStyle);

  return (
    <header className={!scroll ? 'header' : 'header active'}>
      <Link to="/">
        <span className="header__home-button">
          <img
            src="./../assets/png/home-icon-silhouette.png"
            alt="home-button"
            className="header__icon"
          />
        </span>
      </Link>
      <div className="header__button-block">
        {!token && (
          <div>
            <Link to="/signin">
              <span className="header__action-button">
                <img
                  src="./../assets/png/enter.png"
                  alt="login-button"
                  className="header__icon-small"
                />
                {t('header.login')}
              </span>
            </Link>
            <Link to="/signup">
              <span className="header__action-button">{t('header.signup')}</span>
            </Link>
          </div>
        )}
        {token && (
          <div className="header__user-name-block">
            <Link to="/update-user">
              <span className="header__action-button  header__username">
                <img
                  src="./../assets/png/user-profile.png"
                  alt="login-button"
                  className="header__icon-small"
                />
                {userName}
              </span>
            </Link>
            <span className="header__action-button" onClick={logoutUser}>
              <img
                src="./../assets/png/logout.png"
                alt="login-button"
                className="header__icon-small"
              />
              {t('header.logout')}
            </span>
          </div>
        )}
        <select className="header__change-lang" onChange={(e) => changeLanguage(e.target.value)}>
          <option value="en">EN</option>
          <option value="ru">РУС</option>
        </select>
      </div>
    </header>
  );
}
