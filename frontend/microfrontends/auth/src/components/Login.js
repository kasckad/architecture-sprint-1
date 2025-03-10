import React from 'react';

import '../blocks/login/login.css';
import * as auth from "../utils/auth";

const [setTooltipStatus] = React.useState("");
const [setIsLoggedIn] = React.useState(false);
const [setEmail] = React.useState("");
const [setIsInfoToolTipOpen] = React.useState(false);

// при монтировании App описан эффект, проверяющий наличие токена и его валидности
React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
        auth
            .checkToken(token)
            .then((res) => {
                setEmail(res.data.email);
                setIsLoggedIn(true);
                history.push("/");
            })
            .catch((err) => {
                localStorage.removeItem("jwt");
                console.log(err);
            });
    }
}, [history]);

function onLogin({ email, password }) {
  auth
      .login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
}

function Login (){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e){
    e.preventDefault();
    const userData = {
      email,
      password
    }
    onLogin(userData);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Вход</h3>
          <label className="auth-form__input">
            <input type="text" name="name" id="email"
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setEmail(e.target.value)} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
              className="auth-form__textfield" placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required  />
          </label>
        </div>
        <button className="auth-form__button" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;
