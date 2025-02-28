import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../utils/auth";

import "../blocks/login/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password)
        .then((res) => {
          localStorage.setItem("jwt", res.token); // ✅ Сохраняем токен
          history.push("/"); // ✅ Перебрасываем на главную
        })
        .catch((err) => console.error(err));
  }

  return (
      <div className="auth-form">
        <form className="auth-form__form" onSubmit={handleSubmit}>
          <div className="auth-form__wrapper">
            <h3 className="auth-form__title">Вход</h3>
            <label className="auth-form__input">
              <input
                  type="email"
                  name="email"
                  id="email"
                  className="auth-form__textfield"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </label>
            <label className="auth-form__input">
              <input
                  type="password"
                  name="password"
                  id="password"
                  className="auth-form__textfield"
                  placeholder="Пароль"
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </label>
          </div>
          <button className="auth-form__button" type="submit">
            Войти
          </button>
        </form>
      </div>
  );
}

export default Login;
