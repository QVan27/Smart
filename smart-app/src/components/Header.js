import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Nunito } from 'next/font/google'
import Link from 'next/link';

const nunito = Nunito({
  subsets: ['latin'],
  weights: [400, 500, 700],
})

const Container = styled.header`
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  background-color: var(--main);
  width: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 0.9375rem 1.25rem;
    align-items: center;
    margin-inline: auto;

    &__group {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    &__burger {
      display: flex;
      align-items: center;
      height: 1.25rem;

      &.active {
        span {
          background: transparent;
        }

        &::before {
          transform: translateY(0);
          rotate: 135deg;
        }

        &::after {
          transform: translateY(0);
          rotate: -135deg;
        }
      }

      span {
        height: 1px;
        width: 1.25rem;
        background: var(--text-light);
        transition: background 0.3s ease-out;
      }

      &::before,
      &::after {
        content: "";
        display: block;
        position: absolute;
        background-color: var(--text-light);
        height: 1px;
        width: 1.25rem;
        transition: all 0.3s ease-out;
      }

      &::before {
        transform: translateY(-0.5rem);
      }

      &::after {
        transform: translateY(0.5rem);
      }
    }

    &__text {
      color: var(--text-light);
    }
  }
`;

const LogoutButton = styled.button`
  display: grid;
  place-items: center;
  background: none;
  border: none;
  font-size: 1rem;
  color: var(--text-light);
  cursor: pointer;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 13;
  transition: all 0.3s ease-out;
  pointer-events: none;

  &.active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const SideBar = styled.div`
  position: fixed;
  z-index: 14;
  top: 0;
  left: -12.0625rem;
  width: 12.0625rem;
  bottom: 0;
  background-color: var(--text-light);
  transition: all 0.3s ease-out;

  &.active {
    left: 0;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 5.75rem 1.25rem 3.75rem 1.25rem;

    .hLine {
      width: 100%;
      height: 1px;
      background-color: var(--secondary-text);
    }

    &__img {
      margin-bottom: 1.25rem;
      border-radius: 50%;
      overflow: hidden;
      width: 5rem;
      height: 5rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__text {
      display: flex;
      flex-direction: column;
      gap: 0.3125rem;
      color: var(--primary-text);
      
      span:first-child {
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.25;
      }
      
      span:last-child {
        color: var(--secondary-text);
        font-weight: 700;
        font-size: 0.875rem;
      }
    }
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.56rem;
  color: var(--primary-text);

  li {
    display: flex;
    align-items: center;
    gap: 0.625rem;

    &.active {
      padding: 0.3125rem;
      border-radius: 5px;
      background: rgba(255, 99, 0, 0.25);
      color: var(--accident);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    a {
      font-size: 0.875rem;
    }
  }
`;

export default function Header() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleBurgerClick = () => {
    setIsActive(!isActive);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('accessToken')
        },
      });

      if (response.ok) {
        localStorage.removeItem('accessToken');
        router.push('/auth/signin');
      } else {
        console.log('Échec de la déconnexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête de déconnexion:', error);
    }
  };

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
  }, []);

  const userRoles = userInfo?.roles;
  const showManagerLink = userRoles === 'MODERATOR' || userRoles === 'ADMIN';

  return (
    <>
      <Container className={nunito.className}>
        <div className='header'>
          <div className='header__group'>
            <div className={`header__burger ${isActive ? 'active' : ''}`} onClick={handleBurgerClick}>
              <span></span>
            </div>
            <div className='header__text'>
              {router.pathname === "/" && (
                <span>Réunions</span>
              )}
            </div>
          </div>
          <LogoutButton onClick={handleLogout}><Icon icon="iconamoon:exit" /></LogoutButton>
        </div>
      </Container>
      <SideBar className={isActive ? 'active' : ''}>
        <div className={`sidebar ${nunito.className}`}>
          <div className='sidebar__group'>
            <div className='sidebar__img'>
              <img src={userInfo?.picture} alt="Photo de profil" />
            </div>
            <div className='sidebar__text'>
              <span>{userInfo?.firstName + " " + userInfo?.lastName}</span>
              <span>{userInfo?.position}</span>
            </div>
          </div>
          <div className='hLine'></div>
          <List>
            <li className={router.pathname === "/" ? "active" : ""}><Icon icon="uil:schedule" /><Link href='/'>Réunions</Link></li>
            <li><Icon icon="cil:room" /><Link href='/bookings'>Salles</Link></li>
            <li><Icon icon="mdi:people" /><Link href='/bookings'>Employés</Link></li>
            {showManagerLink && (
              <li><Icon icon="material-symbols:manage-accounts" /><Link href='/bookings'>Manager</Link></li>
            )}
            <li><Icon icon="material-symbols:settings" /><Link href='/bookings'>Paramètres</Link></li>
          </List>
        </div>
      </SideBar>
      <Overlay className={isActive ? 'active' : ''} />
    </>
  );
}