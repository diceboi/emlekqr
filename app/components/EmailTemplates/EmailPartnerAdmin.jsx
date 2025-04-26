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
  
  
  export const EmailPartnerAdmin = ({email}) => (
    <Html>
      <Head />
      <Preview>Új Partner regisztrációs kérelem érkezett:</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src='https://www.emlek-qr.hu/emleqr-logo-base.png' style={{ width: '150px', height: 'auto', margin: 'auto', paddingTop: '20px' }} />
          <Heading style={{...h1, textAlign: 'center', marginTop: '32px', marginBottom: '32px'}}>Kedves Gabi, új partner szeretne regisztrálni.</Heading>
          <Text style={{ ...text, marginBottom: '24px'}}>
            Az partner email címe: <span className='font-light'>{email}</span><br></br>
          </Text>
          <Text style={{...text}}>
            Amennyiben szeretnél a partnernek kiküldeni egy regisztrációs űrlapot kattints erre a gombra:
          </Text>
          <Link href={`https://emlek-qr.hu/api/email/partner-urlap-kikuldes?email=${email}`} style={{...button, margin: 'auto', marginBottom: '32px'}}>Regisztrációs űrlap kiküldése</Link>
        </Container>
      </Body>
    </Html>
  );
  
  export default EmailPartnerAdmin;
  
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