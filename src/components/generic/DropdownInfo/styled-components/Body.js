import styled from 'styled-components/macro';

const Body = styled.div`
font-size: 26px;
line-height: normal;
background: #303030;
white-space: pre-wrap;
user-select: none;
overflow: hidden;


${({ displayBody }) => (displayBody ?
  `
  border-top: 1px solid black;
  max-height: 1200px;
  transition: max-height 10s cubic-bezier(0,.72,.83,.67);
  ` 
  : 
  `
  border: 0;
  max-height: 0;
  transition: max-height .25s cubic-bezier(0.5, 0, 0.1, 1);
  `
  )}
  
  
  span {
    display: block;
    padding: 0.8em 2.2em 0.8em 1.2em;
  }
  
  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export default Body;