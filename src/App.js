import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage/WelcomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Gallery from "./pages/Gallery/Gallery";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/gallery" component={Gallery} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
