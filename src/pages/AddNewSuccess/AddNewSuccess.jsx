import { Link } from "react-router-dom";
import "./AddNewSuccess.scss";

function AddNewSuccess() {
  return (
    <>
      <section className="new">
        <div className="new__wrapper">
          <div className="new__form success">
            <h1 className="new__form-heading">submitted successfully!</h1>
            <div className="success__button-container">
              <Link to="/gallery/new" className="success-button">
                add another
              </Link>
              <Link to="/gallery" className="success-button">
                done
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddNewSuccess;
