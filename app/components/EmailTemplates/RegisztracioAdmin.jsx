import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';


export const RegisztracioAdmin = ({name, email}) => (
  <Html>
    <Head />
    <Preview>Új regisztráció: {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src='https://www.emlek-qr.hu/emleqr-logo-base.png' style={{ width: '150px', height: 'auto', margin: 'auto', paddingTop: '20px' }} />
        <Heading style={{...h1, textAlign: 'center', marginTop: '32px', marginBottom: '32px'}}>Kedves Gabi, {name} regisztrált az oldalon.</Heading>
        <Text style={{ ...text, marginBottom: '24px'}}>
          Az ügyfél adatai a következők:
        </Text>
        <Text style={{...text}}>
          Név: <span className='font-light'>{name}</span><br></br>
          Email cím: <span className='font-light'>{email}</span><br></br>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default RegisztracioAdmin;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '32px',
  paddingRight: '32px',
  paddingBottom: '32px',
  margin: '0 auto',
  background: '#f5efed',
  borderRadius: '24px'
};

const h1 = {
  color: '#701633',
  fontFamily:
    "Geologica, Poppins, -apple-system, Poppins, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'semibold',
  margin: 'auto',
  marginTop: '20px',
  padding: '0',
  lineHeight: '20px'
};

const link = {
  color: '#2292a4',
  fontFamily:
    "Geologica, Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '18px',
  textDecoration: 'underline',
};

const text = {
  color: '#191919',
  fontFamily:
    "Geologica, Poppins, 'Inter', sans-serif",
  fontSize: '18px',
  
};