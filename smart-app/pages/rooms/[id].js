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
  padding-top: 5.5rem;
  min-height: 100vh;
  width: 100%;
  background-color: var(--text-light);
`;

export default function SingleRoom() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [room, setRoom] = useState(null);
  const booking = data?.booking;

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/bookings/${id}`, {
          headers: {
            'x-access-token': localStorage.getItem('accessToken')
          }
        });

        if (response.ok) {
          const booking = await response.json();
          setData(booking);
        } else {
          console.log('Failed to fetch booking information.');
        }
      } catch (error) {
        console.error('Error fetching booking information:', error);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);

  useEffect(() => {
    if (booking?.roomId) {
      const fetchRoom = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/rooms/${booking?.roomId}`, {
            headers: {
              'x-access-token': localStorage.getItem('accessToken')
            }
          });

          if (response.ok) {
            const room = await response.json();
            setRoom(room);
          } else {
            console.log('Failed to fetch booking information.');
          }
        } catch (error) {
          console.error('Error fetching booking information:', error);
        }
      };


      fetchRoom();
    }
  }, [booking?.roomId]);

  console.log(room)

  return (
    <>
      <Section className={nunito.className}>
        chambre
      </Section>
    </>
  )
}
