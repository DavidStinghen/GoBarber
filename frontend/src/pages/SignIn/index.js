import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <form action="">
        <input type="email" placeholder="Informe seu e-mail" />
        <input type="password" placeholder="Informe sua senha" />

        <button type="submit">Acessar</button>
        <Link to="register">Criar uma conta</Link>
      </form>
    </>
  );
}
