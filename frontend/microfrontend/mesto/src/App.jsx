import React, {lazy, Suspense, useCallback, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InfoTooltip from "./components/InfoTooltip";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./components/Main";

import "./index.css";

const AuthCheck = lazy(() => import('auth/AuthCheck').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

const Login = lazy(() => import('auth/Login').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

const Logout = lazy(() => import('auth/Logout').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

const Register = lazy(() => import('auth/Register').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

const App = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState('');

  const onAuthCheckSuccess = useCallback((email) => {
    setEmail(email)
    setIsLoggedIn(true)
  }, [])

  const onAuthCheckFail = useCallback(() => {
    setEmail('')
    setIsLoggedIn(false)
  }, [])

  const onLoginSuccess = useCallback((email) => {
    setEmail(email)
    setIsLoggedIn(true)
  }, [])

  const onLoginFail = useCallback(() => {
    setEmail('')
    setIsLoggedIn(false)
    setTooltipStatus('fail')
    setIsInfoToolTipOpen(true)
  }, [])

  const onRegisterSuccess = useCallback((email) => {
    setTooltipStatus("success");
    setIsInfoToolTipOpen(true);
    history.push("/signin");
  }, [history])

  const onRegisterFail = useCallback(() => {
    setTooltipStatus("fail");
    setIsInfoToolTipOpen(true);
  }, [])

  const closeInfoTooltip = useCallback(() => {
    setIsInfoToolTipOpen(false)
    setTooltipStatus('')
  }, [])

  const logout = useCallback(
    () => {
      setIsLoggedIn(null)
    },
    []
  )

  return (
    <div className="page__content">
      <Suspense fallback='fail'>
        <Header email={email} logout={logout}/>

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
          />

          <Route path="/signin">
            <Login onLogin={onLoginSuccess} onLoginFail={onLoginFail}/>
          </Route>

          <Route path="/signup">
            <Register onRegister={onRegisterSuccess} onRegisterFail={onRegisterFail}/>
          </Route>
        </Switch>

        <Footer/>

        <AuthCheck
          onAuthCheckSuccess={onAuthCheckSuccess}
          onAuthCheckFail={onAuthCheckFail}
        />

        <Logout activate={isLoggedIn === null}/>

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeInfoTooltip}
          status={tooltipStatus}
        />
      </Suspense>
    </div>
  );
}

const AppWrapper = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
)

ReactDOM.render(<AppWrapper/>, document.getElementById("app"));
