import React, { useState, useEffect } from "react";
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

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.88rem;
  margin-bottom: 3.17rem;

  .img {
    width: 9.375rem;
    height: 9.375rem;
    border-radius: 50px;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: var(--secondary-shadow);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    p:first-child {
      font-size: 1.125rem;
      font-weight: 700;
    }

    p:last-child {
      color: var(--secondary-text);
      font-size: 0.875rem;
      font-weight: 500;
      margin-top: 0.3125rem;
    }
  }
`;

const List = styled.ul`
  li {
    position: relative;

    p:first-child {
      margin-bottom: 0.3125rem;
      color: var(--secondary-text);
      font-size: 0.75rem;
    }

    p:last-child {
      color: #23252C;
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: -0.3125rem;
      left: 0;
      right: 0;
      height: 1px;
      background-color: var(--secondary-text);
    }
  }
`;

const Edit = styled.div`
  display: flex;
  margin-top: 6.12rem;
  
  div {
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
  }
`;

export default function Settings() {
  const [userInfo, setUserInfo] = useState(null);

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

  return (
    <Section className={nunito.className}>
      <Wrap>
        <Container>
          <Info>
            <div className='img'>
              <img src={userInfo?.picture} alt="" />
            </div>
            <div className='content'>
              <p>{userInfo?.firstName + " " + userInfo?.lastName}</p>
              <p>{userInfo?.email}</p>
            </div>
          </Info>
          <List>
            <li>
              <p>Position</p>
              <p>{userInfo?.position}</p>
            </li>
          </List>
          <Edit>
            <div>
              <Icon icon="akar-icons:edit" />
              <Link href='/settings/edit'>Modifier</Link>
            </div>
          </Edit>
        </Container>
      </Wrap>
    </Section>
  )
}
