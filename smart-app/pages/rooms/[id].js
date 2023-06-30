import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styled from "styled-components";
import Wrap from '@components/Wrap'
import { Nunito } from 'next/font/google'
import { Icon } from '@iconify/react';

const nunito = Nunito({
  subsets: ['latin'],
  weights: [400, 500, 700],
})

const Section = styled.section`
  display: grid;
  place-items: center;
  align-content: center;
  min-height: 95vh;
  width: 100%;
  background-color: var(--text-light);

  @media screen and (min-width: 1180px) {
    padding-top: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: min(100%, 31.25rem);
  margin-inline: auto;

  .image {
    border-radius: 0.3125rem;
    height: 15.375rem;
    overflow: hidden;
    box-shadow: var(--primary-shadow);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export default function SingleRoom() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/rooms/${id}`, {
          headers: {
            'x-access-token': localStorage.getItem('accessToken')
          }
        });

        if (response.ok) {
          const room = await response.json();
          setData(room);
        } else {
          console.log('Failed to fetch booking information.');
        }
      } catch (error) {
        console.error('Error fetching booking information:', error);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  console.log(data)

  return (
    <>
      <Section className={nunito.className}>
        <Wrap>
          <Container>
            <div className="image">
              <img src={data?.image} alt={data?.name} />
            </div>
            <p className='name'>{data?.name}</p>
            <p className='floor'>Étage(s) : <span>{data?.floor}</span></p>
            <p className='email'>Email : <span>{data?.pointOfContactEmail}</span></p>
            <p className='phone'>Téléphone : <span>{data?.pointOfContactPhone}</span></p>
          </Container>
        </Wrap>
      </Section>
    </>
  )
}
