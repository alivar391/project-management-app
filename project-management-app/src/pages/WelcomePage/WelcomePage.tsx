import './welcomePage.css';
export function WelcomePage() {
  return (
    <div className="welcome__page-bg">
      <div className="welcome__page">
        <h1 className="welcome__title">Productivity Planner</h1>
        <h3 className="welcome__subtitle">Set goals and actually conquer them</h3>
        <div className="welcome__desc">
          The key to achieving your goals is to break them down into bite-sized action steps. Want
          to make $5k/month… what products or services are you going to offer? Want 1000 Instagram
          followers… how are you going to connect with them? Start with your yearly goals and then
          break them down into quarters, months, weeks, and days, all with checklists to keep you on
          track.
        </div>
        <div className="welcome__about">
          <h3 className="welcome__subtitle">About us</h3>
          <div className="cards__teams">
            <div className="card__team">
              <img className="card__team-img" src="./assets/jpg/anton-png.png" alt="team-anton" />
              <div className="team__info">
                <h6>Anton Tananka</h6>
                <p>Team-lead</p>
                <a href="https://alivar391.github.io/rsschool-cv/">More in CV</a>
              </div>
            </div>
            <div className="card__team">
              <img className="card__team-img" src="./assets/jpg/diana-png.png" alt="team-diana" />
              <div className="team__info">
                <h6>Diana Byben</h6>
                <p>Frontend Developer</p>
                <a href="./">More in CV</a>
              </div>
            </div>
            <div className="card__team">
              <img
                className="card__team-img"
                src="./assets/jpg/anastasia-png.png"
                alt="team-anastasia"
              />
              <div className="team__info">
                <h6>Anastasia Arzhanik</h6>
                <p>Frontend Developer</p>
                <a href="https://arzhanik-anastasia.github.io/rsschool-cv/">More in CV</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
