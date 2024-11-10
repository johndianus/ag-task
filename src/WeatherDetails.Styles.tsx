import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-auto-columns: calc(99%);
  grid-auto-flow: column;
  grid-gap: 16px;
  overflow-x: auto;
  margin-top: 10px;
  padding: 10px 10px;
  @media (min-width: 768px) {
    grid-auto-columns: calc(20% - 16px);
  }
`;

export const Grid = styled.div`
  width: 100%;
  height: 320px;
  border: 1px solid grey;
  border-radius: 4px;
  background-color: #B3E5FC;
`;

export const WeatherIcon = styled.span`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  margin: 0 auto;
  text-align: center;
`;
export const Row = styled.div`
  margin: 20px 10px;
  border: 1px solid grey;
  height: 30px;
  border-radius: 4px;
`;

export const RowIcon = styled(Row)`
  margin: 10px 30px;
  border: 1px solid grey;
  height: 50px;
`;  

export const Info = styled.div`
  text-align: center;
  padding: 4px;
`;  
