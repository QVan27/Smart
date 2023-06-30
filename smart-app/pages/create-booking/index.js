import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Wrap from '@components/Wrap'
import { Nunito } from 'next/font/google'
import { Icon } from '@iconify/react';
import { formatDate, formatTime } from '@utils/dateFormats';
import Link from 'next/link';
import Image from 'next/image';
import SubmitButton from '@components/buttons/SubmitButton'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Select from 'react-select';

const Section = styled.section`
  display: grid;
  place-items: center;
  align-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: var(--text-light);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .title,
  .rooms,
  .users {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  .dates {
    display: flex;
    gap: 0.375rem;
  }

  input,
  select {
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

export default function CreateBooking() {
  const [start, setStartDate] = useState('');
  const [end, setEndDate] = useState('');
  const [roomBooking, setRoomBooking] = useState('1');
  const [rooms, setRooms] = useState([]);
  const [purpose, setPurpose] = useState('');
  const [selectedOptions, setSelectedOptions] = useState();
  const [optionList, setOptionList] = useState([]);
  // const [accessToken, setAccessToken] = useState(
  //   typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null
  // );
  const startDate = start?.$d
  const endDate = end?.$d
  const userIds = selectedOptions?.map(option => option.value);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/rooms', {
          headers: {
            'x-access-token': localStorage.getItem('accessToken')
          }
        });

        if (response.ok) {
          const rooms = await response.json();
          setRooms(rooms);
        } else {
          console.log('Failed to fetch rooms information.');
        }
      } catch (error) {
        console.error('Error fetching rooms information:', error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users', {
          headers: {
            'x-access-token': localStorage.getItem('accessToken')
          }
        });

        if (response.ok) {
          const users = await response.json();
          const modifiedUsers = users.map(user => ({
            value: user.id,
            label: `${user.firstName} ${user.lastName} (${user.position})`
          }));
          setOptionList(modifiedUsers);
        } else {
          console.log('Failed to fetch users information.');
        }
      } catch (error) {
        console.error('Error fetching users information:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();

    try {
      const res = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ purpose, startDate: formattedStartDate, endDate: formattedEndDate, roomBooking, userIds }),
      });

      console.log(formattedStartDate, formattedEndDate)

      if (res.ok) {
        console.log('Réunion créé avec succès');
        router.push('/');
      } else {
        console.log('Erreur de création de réunion');
      }
    } catch (error) {
      console.error('Erreur de création de réunion:', error);
    }
  }

  const handleRoomChange = (e) => {
    setRoomBooking(e.target.value);
  };

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  const handleSelect = (data) => {
    setSelectedOptions(data);
  };

  return (
    <>
      <Section>
        <Wrap>
          <Form onSubmit={handleSubmit}>
            <div className='title'>
              <label htmlFor='purpose'>Objet de la réunion</label>
              <input
                type="text"
                id="purpose"
                placeholder='Optimisation UI/UX : Actions Concrètes'
                value={purpose}
                onChange={handlePurposeChange} />
            </div>
            <div className='dates'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Début de la réunion"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
                <DateTimePicker
                  label="Fin de la réunion"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div className='rooms'>
              <label htmlFor="room">Sélectionner une salle</label>
              <select name="room" value={roomBooking} onChange={handleRoomChange}>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </select>
            </div>
            <div className='users'>
              <label htmlFor="users">Invités</label>
              <Select
                options={optionList}
                placeholder="Sélectionner des invités"
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                isMulti
              />
            </div>
            <SubmitButton text="Créer" backgroundColor="var(--primary-text)" />
          </Form>
        </Wrap>
      </Section>
    </>
  )
}
