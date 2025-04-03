import React from 'react';

import '../blocks/login/login.css';
import * as auth from '../utils/auth.js';
import {useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import '../blocks/auth-form/auth-form.css'

function Login (){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  function handleSubmit(e){
    e.preventDefault();
    const userData = {
      email,
      password
    }
    onLogin(userData);
  }
  const setIsInfoToolTipOpen = (state) => {
    dispatch({ type: 'setIsInfoToolTipOpen', payload: state });
  };
  const setIsLoggedIn = (state) => {
    dispatch({ type: 'setIsLoggedIn', payload: state });
  };
  const setTooltipStatus = (state) => {
    dispatch({ type: 'setTooltipStatus', payload: state });
  };
  const history = useHistory();


  function onLogin({ email, password }) {
    auth
        .login(email, password)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(email);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          setTooltipStatus("fail");
          setIsInfoToolTipOpen(true);
        });
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
