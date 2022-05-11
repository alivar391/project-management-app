import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import './header.css';

export function Header() {
  const token = useAppSelector((state) => state.userInfo.token.token);
  const userName = useAppSelector((state) => state.userInfo.userInfo.login);
  const [scroll, setScroll] = useState(false);

  const changeStyle = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 70) {
      setScroll(true);
    } else if (window.scrollY < 40) {
      setScroll(false);
    }
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
      {/* <Link to="/welcome">Welcome</Link> */}
      {!token && (
        <div className="header__button-block">
          <Link to="/signin">
            <span className="header__action-button">
              <img
                src="./../assets/png/enter.png"
                alt="login-button"
                className="header__icon-small"
              />
              Log in
            </span>
          </Link>
          <Link to="/signup">
            <span className="header__action-button header__signup"> Sign up </span>
          </Link>
        </div>
      )}
      {token && (
        <div className="header__button-block">
          <Link to="/editProfile">
            <span className="header__action-button">
              <img
                src="./../assets/png/user-profile.png"
                alt="login-button"
                className="header__icon-small"
              />
              {userName}
            </span>
          </Link>
          <span className="header__action-button header__logout">
            <img
              src="./../assets/png/logout.png"
              alt="login-button"
              className="header__icon-small"
            />
            Logout
          </span>
        </div>
      )}
      {/* <Link to="/board">Board</Link> */}
    </header>
  );
}
