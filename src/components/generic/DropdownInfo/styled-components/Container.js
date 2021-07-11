import styled from 'styled-components/macro';

const Container = styled.div`
  color: white;
  margin: auto;
  margin-bottom: 10px;
  max-width: 670px;
  width: 100%;

  &:first-of-type {
    margin-top: 3em;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export default Container;