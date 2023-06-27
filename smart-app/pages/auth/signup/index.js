import AuthLayout from '@components/layouts/AuthLayout'
import styled from 'styled-components'
import { Orbitron } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import Wrap from '@components/Wrap'



const orbitron = Orbitron({
  subsets: ['latin'],
  weights: [400, 700],
})

const Container = styled.div`
  display: grid;
  place-items: center;
  align-content: center;
  height: 100vh;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 4rem;
`;

const SubTitle = styled.h2`
  margin: 3.13rem 0 2.94rem 0;
  color: #FFF;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Redirect = styled.p`
  margin-top: 2.94rem;
  color: #adadad;
  font-size: 0.875rem;
  font-weight: 500;

  a { text-decoration: underline; }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: min(100%, 400px);

  input {
    margin-bottom: 2.94rem;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--secondary-text);
    font-size: 0.875rem;
    font-weight: 500;

    &::placeholder { color: var(--text-light); }

    &:focus {
      outline: none;
      border-bottom: 1px solid var(--accident);
    }
  }

  button {
      display: flex;
      width: 18.75rem;
      padding: 1.25rem 0rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      background: var(--accident);
      border: none;
      margin-inline: auto;
      color: #ffffff;
      text-align: center;
      font-size: 0.875rem;
      font-weight: 700;
    }
`;

export default function Signup() {

  return (
    <Wrap>
      <Container>
        <div>
          <Image src="/astro-connect.svg" alt="logo" width={200} height={150} style={{ objectFit: "contain" }} priority={true} />
          <Title className={orbitron.className}>Smart</Title>
        </div>
        <SubTitle>Connectez votre compte</SubTitle>
        <Form action="api/auth/signup" method="post">
          <input type="text" id="email" name="email" placeholder="Email" required />
          <input type="password" id="password" name="password" placeholder="Mot de passe" required />
          <button type="submit">Se connecter</button>
        </Form>
        <Redirect>
          Ou créer <Link href="/auth/signin">votre comptre</Link>
        </Redirect>
      </Container>
    </Wrap>
  )
}

Signup.getLayout = function (page) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}