import React, { lazy, Suspense, useEffect, useState } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Progress from "./components/Progress";
import { createBrowserHistory } from "history";
import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import Header from "./components/Header";

const AuthLazy = lazy(() => import("./components/AuthApp"));
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();
export default () => {
  const [isSignin, setInSignin] = useState(false);

  useEffect(() => {
    if (isSignin) {
      history.push("/dashboard");
    }
  }, [isSignin]);
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignin={isSignin} onSignOut={() => setInSignin(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setInSignin(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignin && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
