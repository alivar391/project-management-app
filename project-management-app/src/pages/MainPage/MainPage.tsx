import { Header } from '../../components/Header/Header';
import './main-page.css';

export function MainPage() {
  return (
    <div>
      <Header />
      <div className="main">
        <div className="main__header">
          <span className="main__title">Good day, Diana!</span>
          <button className="main__btn">Create board</button>
        </div>
        <div className="main__cont">
          <div className="board">
            <div className="board__view"></div>
            <div className="board__buttns">
              <span className="icon-button">
                <img src="./../assets/jpg/pencil.png" alt="icon-file" />
              </span>
              <span className="icon-button">
                <img src="./../assets/jpg/trash.png" alt="icon-file" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
