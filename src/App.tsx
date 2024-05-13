import './App.css';
import Theme from './theme/theme';
import styled from 'styled-components';

function App() {
  return (
    <div className="App">
      <Theme>
        <Container>
          <Heading>Loan Form</Heading>
        </Container>
        <Body></Body>
      </Theme>
    </div>
  );
}

const Container = styled.div`
  width: 100%;
  text-align: center;
  border: ${(props) => `1px solid ${props.theme.colors.quaternary}`};
  background-color: ${(props) => props.theme.colors.tertiary};
  font-family: ${(props) => props.theme.fonts[0]};
`;

const Body = styled.div`
  margin: 40px;
  height: calc(100vh - 160px);
  text-align: center;
  border: ${(props) => `2px solid ${props.theme.colors.tertiary}`};
  background-color: ${(props) => props.theme.colors.quaternary};
  font-family: ${(props) => props.theme.fonts[0]};
  border-radius: 8px;
`;

const Heading = styled.h1`
  color: ${({ theme: { colors } }) => colors.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.extra};
`;

export default App;
