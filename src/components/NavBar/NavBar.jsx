import "./NavBar.scss";
import logo from "../../assests/logo/logo.png";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <>
      <section className="navbar">
        <div className="navbar__wrapper">
          <div className="navbar__container">
            <div className="navbar__logo-container">
              <h2 className="navbar__logo">Journal</h2>
              <Link to="/">
                <img
                  className="navbar__logo-image"
                  src={logo}
                  alt="man with camera outline"
                ></img>
              </Link>
            </div>
            <ul className="navbar__links">
              <NavLink
                exact
                to="/gallery"
                className="navbar__link-item"
                activeClassName="navbar__link-item--selected"
              >
                gallery
              </NavLink>
              <NavLink
                to="/gallery/map"
                className="navbar__link-item"
                activeClassName="navbar__link-item--selected"
              >
                map
              </NavLink>
              <NavLink
                to="/gallery/new"
                className="navbar__link-item"
                activeClassName="navbar__link-item--selected"
              >
                + add new
              </NavLink>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default NavBar;
