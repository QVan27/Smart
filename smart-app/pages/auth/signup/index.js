import AuthLayout from '@components/layouts/AuthLayout'
import styled from 'styled-components'
import { Orbitron } from 'next/font/google'
import Image from 'next/image'
import Wrap from '@components/Wrap'
import { useRouter } from 'next/router';
import { useState } from 'react';
import SubmitButton from '@components/buttons/SubmitButton'

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
  color: var(--text-light);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 4rem;
`;

const SubTitle = styled.h2`
  margin: 3.13rem 0 2.94rem 0;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: min(100%, 400px);

  input,
  select {
    margin-bottom: 1.87rem;
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
`;

const ErrorMessage = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  top: -25px;
  color: var(--accident);
  font-size: 0.875rem;
`;

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email);
};

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState(['USER']);
  const [picture, setPicture] = useState('https://avatars.githubusercontent.com/u/12041934');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!firstName || !lastName || !email || !position || !password) {
        setError('Veuillez remplir tous les champs');
        return;
      }

      if (!isEmailValid(email)) {
        setError('Veuillez entrer une adresse email valide');
        return;
      }

      const res = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, picture, position, password, roles }),
      });

      if (res.ok) {
        console.log('Compte créé avec succès');
        router.push('/auth/signin');
      } else {
        setError('Erreur de création de compte');
      }
    } catch (error) {
      console.error('Erreur de création de compte:', error);
      setError('Erreur de création de compte');
    }
  }


  const handleFirstNameInputChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameInputChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePositionInputChange = (e) => {
    setPosition(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRoles(e.target.value);
  };

  const handlePictureInputChange = (e) => {
    setPicture(e.target.value);
  };

  return (
    <Wrap>
      <Container>
        <div>
          <Image
            src="/images/astro-signin.svg"
            alt="logo"
            width={200}
            height={150}
            style={{ objectFit: "contain" }}
            priority={true} />
          <Title className={orbitron.className}>Smart</Title>
        </div>
        <SubTitle>Créer votre compte</SubTitle>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage className={orbitron.className}>{error}</ErrorMessage>}
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Prénom"
            value={firstName}
            onChange={handleFirstNameInputChange}
            required />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Nom"
            value={lastName}
            onChange={handleLastNameInputChange}
            required />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailInputChange}
            required />
          <input
            type="text"
            id="picture"
            name="picture"
            placeholder="Photo de profil"
            value={picture}
            onChange={handlePictureInputChange}
            disabled />
          <input
            type="text"
            id="position"
            name="position"
            placeholder="Position"
            value={position}
            onChange={handlePositionInputChange}
            required />
          <select name="roles" value={roles} onChange={handleRoleChange} disabled>
            <option value="USER">USER</option>
            <option value="MODERATOR">MODERATOR</option>
          </select>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordInputChange}
            required />
          <SubmitButton text="S'inscrire" backgroundColor="var(--accident)" />
        </Form>
      </Container>
    </Wrap>
  )
}

SignUp.getLayout = function (page) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}