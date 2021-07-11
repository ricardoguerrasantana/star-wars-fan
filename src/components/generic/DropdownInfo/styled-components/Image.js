import styled from 'styled-components/macro';

const Image = styled.img`
  filter: brightness(0) invert(1);
  width: 24px;

  @media (max-width: 600px) {
    width: 16px;
  }
`;

export default Image;