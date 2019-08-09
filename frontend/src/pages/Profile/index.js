import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileRequest } from '../../store/modules/user/actions';
import AvatarInput from './AvatarInput';
import { Container } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Informe seu nome completo" />
        <Input name="email" type="email" placeholder="Informe seu e-mail" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Informe sua senha atual"
        />
        <Input
          type="password"
          name="password"
          placeholder="Informe sua nova senha"
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua nova senha"
        />

        <button type="submit">Atualizar perfil </button>
      </Form>

      <button type="button">Sair do GoBarber</button>
    </Container>
  );
}
