import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Wrap from '@components/Wrap'
import { Nunito } from 'next/font/google'
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';

const nunito = Nunito({
  subsets: ['latin'],
  weights: [400, 500, 700],
})

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 5.5rem;
  width: 100%;
  background-color: var(--text-light);
`;

const Container = styled.div`
  margin-inline: auto;
  width: min(100%, 400px);
`;


const Form = styled.form`
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.88rem;

    label {
      margin-bottom: 0.3125rem;
      color: var(--secondary-text);
      font-size: 0.75rem;
    }

    input {
      position: relative;
      background-color: var(--text-light);
      border: none;
      border-bottom: 1px solid var(--secondary-text);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--main);

      &:focus {
        outline: none;
        border-bottom: 1px solid var(--accident);
      }
    }
  }
`;

const Send = styled.div`
  display: flex;
  margin-top: 6.12rem;
  
  button {
    display: flex;
    width: 12.5rem;
    padding: 0.9375rem 0rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-inline: auto;
    border-radius: 30px;
    background: var(--main);
    color: var(--text-light);
    cursor: pointer;
  }
`;


export default function Edit() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [updateUser, setUpdateUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user', {
          headers: {
            'x-access-token': localStorage.getItem('accessToken')
          }
        });

        if (response.ok) {
          const user = await response.json();
          setUserInfo(user);
        } else {
          console.log('Failed to fetch user information.');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [userInfo]);

  useEffect(() => {
    if (updateUser !== null) {
      setAccessToken(updateUser.accessToken);
      router.push('/settings');
    }
  }, [updateUser, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/users/${userInfo?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': accessToken,
        },
        body: JSON.stringify({
          email: email,
          picture: picture,
          position: position,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setUpdateUser(data)
      } else {
        console.log('Échec de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête de connexion:', error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  return (
    <Section className={nunito.className}>
      <Wrap>
        <Container>
          <Form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder={userInfo?.email}
                value={email}
                onChange={handleEmailChange}
                required />
            </div>
            <div className='form-group'>
              <label htmlFor="picture">Photo</label>
              <input
                type="text"
                id="picture"
                name="picture"
                placeholder={userInfo?.picture}
                value={picture}
                onChange={handlePictureChange}
                required />
            </div>
            <div className='form-group'>
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                placeholder={userInfo?.position}
                value={position}
                onChange={handlePositionChange}
                required />
            </div>
            <Send>
              <button type='submit'>
                <span>Valider</span>
                <Icon icon="bi:send" />
              </button>
            </Send>
          </Form>
        </Container>
      </Wrap>
    </Section>
  )
}