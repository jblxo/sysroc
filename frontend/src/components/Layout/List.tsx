import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  .flex {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: stretch;
    align-content: space-between;
    height: 5rem;
    padding: 5px 2rem;
    transition: all 0.3s ease;

    &:nth-child(odd) {
      background-color: ${grey[100]};
    }

    &:hover:not(:first-child) {
      background-color: ${blue[300]};
    }

    &:first-child {
      font-weight: 300;
      color: ${grey[700]};
    }
  }
`;
