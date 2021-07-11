import styled from 'styled-components/macro';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size: 26px;
  background: #303030;
  padding: 0.8em 1.2em;
  user-select: none;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export default Header;