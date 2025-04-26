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
  
  
  export const PartnerRegisztraciosUrlapUgyfel = ({email}) => (
    <Html>
      <Head />
      <Preview>Partner regisztrációs kérelmedet elfogadtuk</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src='https://www.emlek-qr.hu/emleqr-logo-base.png' style={{ width: '150px', height: 'auto', margin: 'auto', paddingTop: '20px' }} />
          <Heading style={{...h1, textAlign: 'center', marginTop: '32px', marginBottom: '32px'}}>Kedves leendő Partnerünk! Regisztrációs kérelmedet elfogadtuk.</Heading>
          <Text style={{ ...text, marginBottom: '16px' }}>
            Partnerként látni fogod:
          </Text>

          <ul style={ul}>
            <li style={li}>Ki vásárolt a te kuponkódoddal</li>
            <li style={li}>A saját kuponkódodat</li>
            <li style={li}>Hány vásárlás történt eddig a kuponkódoddal, és a vásárlások értékét.</li>
          </ul>
          <Text style={{ ...text, marginBottom: '24px'}}>
            Kérlek kattints az alábbi gombra, és regisztrálj be az oldalunkra partnerként.
          </Text>
          <Link href={`https://emlek-qr.hu/partner-regisztracio?email=${email}`} style={{...button, margin: 'auto', marginBottom: '32px'}}>Regisztráció</Link>
        </Container>
      </Body>
    </Html>
  );
  
  export default PartnerRegisztraciosUrlapUgyfel;
  
  const main = {
    backgroundColor: '#ffffff',
  };
  
  const container = {
    paddingLeft: '32px',
    paddingRight: '32px',
    paddingTop: '32px',
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

  const button = {
    color: '#ffffff',
    fontSize: '18px',
    fontFamily:
      "Geologica, Poppins, 'Inter', sans-serif",
    backgroundColor: '#2292a4',
    borderRadius: '50px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    margin: 'auto'
  }

  const ul = {
    paddingLeft: '20px',
    marginBottom: '24px',
  };
  
  const li = {
    marginBottom: '8px',
    listStyleType: 'disc',
    color: '#191919',
    fontFamily: "Geologica, Poppins, 'Inter', sans-serif",
    fontSize: '16px',
  };