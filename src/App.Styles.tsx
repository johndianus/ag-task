import styled from 'styled-components';
import { Colors } from './colors';

export const Container = styled.div`
  display: flow-root;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.primary} ;
`;

export const SearchWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  min-width: 400px;
  flex-grow: 0;
`;
