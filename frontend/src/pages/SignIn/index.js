import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('Você deve informar seu e-mail'),
  password: Yup.string().required('Vocẽ deve informar sua senha'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Informe seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Informe sua senha"
        />

        <button type="submit">Acessar</button>
        <Link to="register">Criar uma conta</Link>
      </Form>
    </>
  );
}
