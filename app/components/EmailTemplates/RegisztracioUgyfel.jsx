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
  
  
  export const Kapcsolat = ({nev}) => (
    <Html>
      <Head />
      <Preview>Sikeres regisztráció</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src='https://www.emlek-qr.hu/emleqr-logo-base.png' style={{ width: '150px', height: 'auto', margin: 'auto', paddingTop: '20px' }} />
          <Heading style={{...h1, textAlign: 'center', marginTop: '32px', marginBottom: '32px'}}>Kedves {nev}, sikeresen regisztráltál az EmlékQR oldalra.</Heading>
          <Text style={{ ...text, marginBottom: '24px'}}>
            A következő lépésként nézd meg a <a href='https://emlek-qr.hu/profil' target='__blank' style={{...link}}>profilod</a> , töltsd fel profilképet, keress rá szeretteid ismerőseid adatlapjára, kommentelj, vagy irány az <a href='https://emlek-qr.hu/erme' target='__blank' style={{...link}}>érme</a> oldal és szerezz magadnak egy emlékérmét.
          </Text>
          <Text style={{...text}}>
            Kérdés esetén keress bátran bennünket az <a href='mailto:info@emlek-qr.hu' style={{...link}}>info@emlek-qr.hu</a> email címen, vagy a <a href='https://emlek-qr.hu/kapcsolat' target='__blank' style={{...link}}>kapcsolat</a> oldalon!
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default Kapcsolat;
  
  const main = {
    backgroundColor: '#ffffff',
  };
  
  const container = {
    paddingLeft: '32px',
    paddingRight: '32px',
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