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
  
  
  export const UjPartnerRegisztracioAdmin = ({email, name, couponcode, uzletnev, bankszamlaszam}) => (
    <Html>
      <Head />
      <Preview>Egy új partner regisztrált:</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src='https://www.emlek-qr.hu/emleqr-logo-base.png' style={{ width: '150px', height: 'auto', margin: 'auto', paddingTop: '20px' }} />
          <Heading style={{...h1, textAlign: 'center', marginTop: '32px', marginBottom: '32px'}}>Kedves Gabi, egy új partner regisztrált az oldalra.</Heading>
          <Text style={{ ...text, marginBottom: '24px'}}>
            Email címe: <span className='font-light'>{email}</span><br></br>
            Neve: <span className='font-light'>{name}</span><br></br>
            Üzletének neve: <span className='font-light'>{uzletnev}</span><br></br>
            Kupon kódja: <span className='font-light'>{couponcode}</span><br></br>
            Bankszámlaszáma: <span className='font-light'>{bankszamlaszam}</span><br></br>
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default UjPartnerRegisztracioAdmin;
  
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