import styled from "styled-components";
import Wrap from '@components/Wrap'

const Container = styled.div`
  display: grid;
  place-items: center;
  align-content: center;
  height: 100vh;
  width: 100%;
  background-color: var(--text-light);
`;

export default function Home() {

  return (
    <Container>
      <Wrap>
        <div>
          main
        </div>
      </Wrap>
    </Container>
  )
}
