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


export const Ugyfel = ({nev}) => (
  <Html>
    <Head />
    <Preview>Örülök, hogy írtál!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src='https://evaperlay.vercel.app/_next/image?url=%2Flogo%2Fevaperlay-logo-gardient-1.png&w=256&q=75' style={{ width: '150px', height: 'auto', margin: 'auto', paddingTop: '20px' }} />
        <Heading style={{...h1, textAlign: 'center'}}>Kedves {nev}, örülök, hogy felvetted velem a kapcsolatot.</Heading>
        <Text style={{ ...text, marginBottom: '24px'}}>
          Megpróbálok neked minél előbb válaszolni!
        </Text>
        <Text style={{...text}}>
          Addig is olvass bele szakmai írásaimba <Link href='https://evaperlay.com/blog'>blogomon</Link>, vagy <Link href='https://www.linkedin.com/in/evaperlay'>Linkedin-en</Link>
        </Text>
        <Text style={{...text}}>
          Ha esetleg nagyon sürgős dolog miatt kerestél, keress ezen a telefonszámon: <a style={{...link}} href='tel:+36704289747'>+36 70 428 9747</a>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default Ugyfel;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
  background: '#f5f5f7',
  borderRadius: '5px'
};

const h1 = {
  color: '#2b089d',
  fontFamily:
    "Poppins, -apple-system, Poppins, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '28px',
  fontWeight: 'semibold',
  margin: 'auto',
  marginTop: '20px',
  padding: '0',
  lineHeight: '34px'
};

const link = {
  color: '#58e7b9',
  fontFamily:
    "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '18px',
  textDecoration: 'underline',
};

const text = {
  color: '#191919',
  fontFamily:
    "Poppins, 'Inter', sans-serif",
  fontSize: '18px',
  
};