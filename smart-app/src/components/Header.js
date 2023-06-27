"use client"

import React from "react";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  z-index: 100;
  transition: all 1s ease-in-out;
  padding: 20px 5%;
  height: 80px;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

export default function Header() {
  return (
    <Container>
      header
    </Container>
  );
}