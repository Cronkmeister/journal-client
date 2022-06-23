import "./WelcomePage.scss";
import { Link } from "react-router-dom";

function WelcomePage() {
  document.title = "Film Journal";
  return (
    <>
      <section className="welcome">
        <div className="welcome__container-left"></div>
        <div className="welcome__container-right">
          <div className="welcome__button-box">
            <h2 className="welcome__title">
              Welcome to <br></br>Journal
            </h2>
            <Link to="/gallery" className="welcome__button">
              Enter
            </Link>
            <Link to="/login" className="welcome__button">
              Log in
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default WelcomePage;
