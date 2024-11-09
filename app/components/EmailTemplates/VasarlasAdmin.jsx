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
  
  
  export const VasarlasAdmin = ({nev, address, payment, type, phone, email}) => (
    <Html>
      <Head />
      <Preview>Új érme vásárlás</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src='https://www.emlek-qr.hu/emleqr-logo-base.png' style={{ width: '150px', height: 'auto', margin: 'auto', paddingTop: '20px' }} />
          <Heading style={{...h1, textAlign: 'center', marginTop: '32px', marginBottom: '32px'}}>Kedves Gabi, új vásárlás történt az oldalon.</Heading>
          <div style={{ marginBottom: '24px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '8px', paddingTop: '8px', backgroundColor: '#ffffff', borderRadius: '32px' }}>
            <Text style={{ ...text, marginBottom: '16px',}}>
                Az érméd amit kiválasztottak a következő:
            </Text>
            <div>
                <Text style={{ ...text, marginBottom: '16px',}}>
                    Forma: {type}<br></br>
                    Fizetési mód: {payment}
                </Text>
                <Text style={{ ...text, }}>
                    Ügyféladatok:<br></br><br></br>
                    Név: {nev}<br></br>
                    Szállítási cím: {address}
                    Telefonszám: {phone}
                    Email: {email}
                </Text>
            </div>
          </div>
          <Text style={{ ...text, marginBottom: '24px'}}>
            Kérlek válassz ki egy érmét a kért formából és add fel postán amint időd engedi.
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default VasarlasAdmin;
  
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