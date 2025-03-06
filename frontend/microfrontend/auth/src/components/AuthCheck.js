import React from 'react'
import { useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

// Проверка статуса авторизации
function AuthCheck ({ onAuthCheckSuccess, onAuthCheckFail }){
    const history = useHistory()

    React.useEffect(() => {
        console.debug('AuthCheck: started')

        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    console.debug('AuthCheck: success')

                    onAuthCheckSuccess(res.data.email)
                    history.push("/");
                })
                .catch((err) => {
                    console.debug('AuthCheck: error')

                    localStorage.removeItem("jwt");
                    onAuthCheckFail()
                    history.push("/signin");
                    console.log(err);
                });
        } else {
            console.debug('AuthCheck: token not found')

            onAuthCheckFail()
            history.push("/signin");
        }
    }, [history, onAuthCheckSuccess, onAuthCheckFail]);

    return <></>
}

export default AuthCheck;