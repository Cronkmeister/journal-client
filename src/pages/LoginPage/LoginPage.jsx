import "./LoginPage.scss";

function LoginPage() {
  return (
    <>
      <section className="welcome">
        <div className="welcome__container-left"></div>
        <div className="welcome__container-right">
          <form className="welcome__form">
            <h3 className="welcome__form-title">Enter details</h3>
            <label className="welcome__form-label">username</label>
            <input className="welcome__form-input"></input>
            <label className="welcome__form-label">password</label>
            <input className="welcome__form-input" type="password"></input>
            <button className="welcome__form-button" type="submit">
              Submit
            </button>
            {/* <p>don't have an account? Sign up</p> */}
          </form>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
