import React from 'react';
import { Image } from 'react-native';

import Background from '~/components/Background';
import logo from '~/assets/logo.png';

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

export default function SignIn({ navigation }) {
  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyBoardType="email-address"
            autoCaptalize="none"
            placeholder="Digite seu e-mail"
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
          />

          <SubmitButton onPress={() => {}}>Acessar</SubmitButton>
        </Form>

        <SignLink onPress={() => { navigation.navigate('SignUp')}}>
          <SignLinkText>Criar uma conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
