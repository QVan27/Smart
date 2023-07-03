import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styled from "styled-components";
import Wrap from '@components/Wrap'
import SubmitButton from '@components/buttons/SubmitButton'


const Section = styled.section`
  display: grid;
  place-items: center;
  align-content: center;
  min-height: 95vh;
  width: 100%;
  background-color: var(--text-light);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-inline: auto;
  width: min(414px, 100%);

  .name,
  .image,
  .floor,
  .pointOfContactEmail,
  .pointOfContactPhone {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  .name input,
  .image input,
  .floor input,
  .pointOfContactEmail input,
  .pointOfContactPhone input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--secondary-text);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--primary-text);

    &::placeholder { color: var(--secondary-text); }

    &:focus {
      outline: none;
      border-bottom: 1px solid var(--accident);
    }
  }
`;


export default function AddRoom() {
  const router = useRouter();
  const [name, setName] = useState(null);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1542089363-bba089ffaa25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
  const [floor, setFloor] = useState();
  const [pointOfContactEmail, setPointOfContactEmail] = useState([]);
  const [pointOfContactPhone, setPointOfContactPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:8080/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          name,
          image,
          floor,
          pointOfContactEmail,
          pointOfContactPhone
        }),
      });

      if (res.ok) {
        console.log('Réunion créé avec succès');
        router.push('/rooms');
      } else {
        console.log('Erreur de création de réunion');
      }
    } catch (error) {
      console.error('Erreur de création de réunion:', error);
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleFloorChange = (e) => {
    setFloor(e.target.value);
  };

  const handlePointOfContactEmailChange = (e) => {
    setPointOfContactEmail(e.target.value);
  };

  const handlePointOfContactPhoneChange = (e) => {
    setPointOfContactPhone(e.target.value);
  };

  return (
    <>
      <Section>
        <Wrap>
          <Form onSubmit={handleSubmit}>
            <div className='name'>
              <label htmlFor='name'>Nom de la salle</label>
              <input
                type="text"
                id="name"
                placeholder='Salle des Ingénieurs'
                value={name}
                onChange={handleNameChange}
                required />
            </div>
            <div className='image'>
              <label htmlFor='image'>Image</label>
              <input
                type="text"
                id="image"
                placeholder='https://images.unsplash.com/photo-1542089363-bba089ffaa25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
                value={image}
                onChange={handleImageChange} />
            </div>
            <div className='floor'>
              <label htmlFor='floor'>Étage(s)</label>
              <input
                type="text"
                id="floor"
                placeholder='1er'
                value={floor}
                onChange={handleFloorChange}
                required />
            </div>
            <div className='pointOfContactEmail'>
              <label htmlFor='pointOfContactEmail'>Email du contact</label>
              <input
                type="text"
                id="pointOfContactEmail"
                placeholder='john.doe@smart.com'
                value={pointOfContactEmail}
                onChange={handlePointOfContactEmailChange}
                required />
            </div>
            <div className='pointOfContactPhone'>
              <label htmlFor='pointOfContactPhone'>Téléphone du contact</label>
              <input
                type="text"
                id="pointOfContactPhone"
                placeholder='06 12 34 56 78'
                value={pointOfContactPhone}
                onChange={handlePointOfContactPhoneChange}
                required />
            </div>
            <SubmitButton text="Créer" backgroundColor="var(--accident)" />
          </Form>
        </Wrap>
      </Section>
    </>
  )
}
