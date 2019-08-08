import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <form action="">
        <input placeholder="Informe seu nome completo" />
        <input type="email" placeholder="Informe seu e-mail" />
        <input type="password" placeholder="Informe sua senha" />

        <button type="submit">Cadastre-se</button>
        <Link to="/">Já tenho uma conta</Link>
      </form>
    </>
  );
}
