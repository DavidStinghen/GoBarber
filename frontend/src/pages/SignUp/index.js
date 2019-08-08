import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '../../store/modules/auth/actions';
import logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('Você deve informar seu nome'),
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('Você deve informar seu e-mail'),
  password: Yup.string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('Vocẽ deve informar sua senha'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Informe seu nome completo" />
        <Input name="email" type="email" placeholder="Informe seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Informe sua senha"
        />

        <button type="submit">Cadastre-se</button>
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </>
  );
}
