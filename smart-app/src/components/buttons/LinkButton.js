import React from "react";
import styled from "styled-components";
import Link from 'next/link';

const Button = styled.div`
  margin-top: 4rem;
  
  a {
    display: flex;
    width: 18.75rem;
    padding: 1.25rem 0rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background: ${(props) => props.backgroundColor};
    color: var(--text-light);
    border: none;
    margin-inline: auto;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;

    @media screen and (hover: hover) {
      position: relative;
      overflow: hidden;

      span {
        position: relative;
        z-index: 2;
      }

      &::before {
        content: '';
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        border-radius: 50%;
        background: var(--text-light);
        opacity: 0.35;
        transition: transform 0.5s ease-in-out;
        transform-origin: center;
        width: 20rem;
        height: 20rem;
      }

      &:hover::before {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
`;

export default function LinkButton({ href, text, backgroundColor }) {
  return (
    <Button backgroundColor={backgroundColor}>
      <Link href={href}>
        {text}
      </Link>
    </Button>
  );
}