import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styled from "styled-components";
import Wrap from '@components/Wrap'
import { Nunito } from 'next/font/google'
import { Icon } from '@iconify/react';
import Link from 'next/link';

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

  .room-link {
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    .room-link {
      grid-area: 1 / 5 / 2 / 9;
    }

    .guests {
      grid-area: 2 / 1 / 3 / 9;
    }
  }

  @media screen and (min-width: 1180px) {
    padding-top: 0;

    .room-link {
      grid-area: 2 / 1 / 3 / 4;
    }

    .guests {
      grid-area: 1 / 4 / 3 / 9;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.875rem;
  flex-shrink: 0;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
  }

`;

const About = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;

  @media screen and (min-width: 768px) {
    grid-area: 1 / 1 / 2 / 5;
  }

  @media screen and (min-width: 1180px) {
    grid-area: 1 / 1 / 2 / 4;
  }

  .talk {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3125rem;

    h1 {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    &__dates {
      display: flex;
      align-items: flex-start;
      gap: 1.25rem;

      span {
        text-align: center;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }
`;

const Room = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.3125rem;
  background: var(--text-light);
  box-shadow: var(--primary-shadow);
  overflow: hidden;

  .image {
    display: flex;
    width: 100%;
    height: 9.375rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    display: flex;
    padding: 0.9375rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
    align-self: stretch;

    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      p:first-child {
        text-align: center;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }

      p:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.625rem;

        span {
          text-align: center;
          font-size: 0.75rem;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
      }
    }

    &__bottom {
      display: flex;
      flex-direction: column;
      color: var(--secondary-text);
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  margin-top: 1.88rem;
  padding-bottom: 1.88rem;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ListItem = styled.li`
  display: flex;
  padding: 0rem 0rem 0rem 0.9375rem;
  align-items: center;
  gap: 0.9375rem;

  .list__img {
    min-width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: var(--secondary-shadow);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .list__text {
    color: var(--primary-text);
    font-size: 0.875rem;

    &__job {
      color: var(--secondary-text);
      font-size: 0.8rem;
      text-transform: capitalize;
    }
  }

  &.active {
    background-color: var(--light-gray);
  }
`;

export default function SingleBooking() {
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
        <Wrap>
          <Container>
            <About>
              <Icon icon="solar:calendar-linear" />
              <div className='talk'>
                <h1>{booking?.purpose}</h1>
                <div className='talk__dates'>
                  <span>{booking?.startDate}</span>
                  <span>{booking?.endDate}</span>
                </div>
              </div>
            </About>
            <Link className='room-link' href={`/rooms/${room?.id}/`}>
              <Room>
                <div className='image'>
                  <img src={room?.image} alt="" />
                </div>
                <div className='content'>
                  <div className='content__top'>
                    <p>{room?.name}</p>
                    <p>
                      <Icon icon="mdi:people" />
                      <span>
                        {booking?.users.length}
                      </span>
                    </p>
                  </div>
                  <div className='content__bottom'>
                    <p>{room?.floor} étage</p>
                    <p>{room?.pointOfContactEmail}</p>
                  </div>
                </div>
              </Room>
            </Link>
            <div className='guests'>
              <p>Participants</p>
              <List>
                {booking?.users &&
                  booking?.users
                    .sort((a, b) => a.firstName.localeCompare(b.firstName))
                    .map((user) => (
                      <ListItem
                        key={user.id}
                        className='list__item'
                      >
                        <div className='list__img'>
                          <img src={user.picture} alt={user.firstName} />
                        </div>
                        <div className='list__text'>
                          <div className='list__text__name'>
                            {user.firstName + ' ' + user.lastName}
                          </div>
                          <div className='list__text__job'>
                            {user.position}
                          </div>
                        </div>
                      </ListItem>
                    ))}
              </List>
            </div>
          </Container>
        </Wrap>
      </Section>
    </>
  )
}
