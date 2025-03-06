import React, { useCallback, useEffect } from 'react'
import { useHistory } from "react-router-dom";

// Проверка статуса авторизации
function Logout({activate, onLogout}) {
  const history = useHistory()

  const logout = useCallback(
    () => {
      localStorage.removeItem("jwt");

      if (onLogout) onLogout()
      history.push("/signin");
    },
    [history, onLogout]
  )

  useEffect(
    () => {
      if (!activate) return

      console.debug('Logout: logout')

      logout()
    },
    [activate, logout]
  )

  return <></>
}

export default Logout;