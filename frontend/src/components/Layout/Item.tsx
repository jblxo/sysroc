import styled from 'styled-components';

export const Item = styled.div`
  flex: 1 1 0;
  display: flex;
  margin: auto;

  div {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  &.actions {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: stretch;
    align-content: space-between;
  }
`;
