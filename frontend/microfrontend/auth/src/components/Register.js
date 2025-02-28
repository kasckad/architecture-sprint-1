import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { register } from "../utils/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // ✅ Для ошибок
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setError(null); // 🔄 Очистка ошибок

    register(email, password)
        .then(() => {
          history.push("/signin"); // ✅ Редирект на логин
        })
        .catch((err) => {
          setError("Ошибка регистрации: " + err);
        });
  }

  return (
      <div className="auth-form">
        <form className="auth-form__form" onSubmit={handleSubmit}>
          <div className="auth-form__wrapper">
            <h3 className="auth-form__title">Регистрация</h3>
            {error && <p className="auth-form__error">{error}</p>} {/* ✅ Показываем ошибку */}
            <label className="auth-form__input">
              <input
                  type="text"
                  name="email"
                  id="email"
                  className="auth-form__textfield"
                  placeholder="Email"
                  value={email}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </label>
          </div>
          <div className="auth-form__wrapper">
            <button className="auth-form__button" type="submit">Зарегистрироваться</button>
            <p className="auth-form__text">
              Уже зарегистрированы? <Link className="auth-form__link" to="/signin">Войти</Link>
            </p>
          </div>
        </form>
      </div>
  );
}

export default Register;
