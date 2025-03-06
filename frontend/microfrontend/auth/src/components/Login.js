import React, {useCallback} from 'react';
import { useHistory } from "react-router-dom";
import '../blocks/auth-form/auth-form.css';
import * as auth from "../utils/auth";

function Login({onLogin, onLoginFail}) {
    const history = useHistory()

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            auth
                .login(email, password)
                .then((res) => {
                    console.debug('Login: success')

                    onLogin(email)
                    history.push("/");
                })
                .catch((err) => {
                    console.debug('Login: fail')
                    console.error(err)

                    onLoginFail(email)
                });
        },
        [email, history, onLogin, onLoginFail]
    )

    return (
        <div className="auth-form">
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__wrapper">
                    <h3 className="auth-form__title">Вход</h3>
                    <label className="auth-form__input">
                        <input type="text" name="name" id="email"
                               className="auth-form__textfield" placeholder="Email"
                               onChange={e => setEmail(e.target.value)} required/>
                    </label>
                    <label className="auth-form__input">
                        <input type="password" name="password" id="password"
                               className="auth-form__textfield" placeholder="Пароль"
                               onChange={e => setPassword(e.target.value)} required/>
                    </label>
                </div>
                <button className="auth-form__button" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;
