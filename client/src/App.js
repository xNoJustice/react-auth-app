import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from "./styles/logo.svg";
import "./styles/logo.css";

import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/pages/Dashboard";
import Test from "./components/pages/Test";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  return (
    <div className="w-full h-screen max-h-screen mx-auto p-6">
      <img src={logo} className="logo mx-auto" alt="logo" />
      <Router>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/test" component={Test} />
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPassword}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
