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
  
  
  export const VasarlasUgyfel = ({nev, secret, payment, type}) => (
    <Html>
      <Head />
      <Preview>Köszönjük a vásárlást</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src='https://www.emlek-qr.hu/emleqr-logo-base.png' style={{ width: '150px', height: 'auto', margin: 'auto', paddingTop: '20px' }} />
          <Heading style={{...h1, textAlign: 'center', marginTop: '32px', marginBottom: '32px'}}>Kedves {nev}, sikeresen megvásároltad az EmlékQR érmédet.</Heading>

          <Text style={{ ...text, marginBottom: '24px'}}>
            Jelenleg nincs más dolgod, mint megvárni amíg megérkezik az érméd. Az érmét levélként fogod megkapni postaládádba.
          </Text>
          <div style={{ marginBottom: '24px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '8px', paddingTop: '8px', backgroundColor: '#ffffff', borderRadius: '32px' }}>
            <Text style={{ ...text, marginBottom: '16px',}}>
                Az érméd amit kiválasztottál a következő:
            </Text>
            <div>
                <Text style={{ ...text, marginBottom: '16px',}}>
                    Forma: {type}<br></br>
                    Fizetési mód: {payment}
                </Text>
            </div>
          </div>
          <Text style={{ ...text, marginBottom: '24px'}}>
            Miután az érméd megérkezett, telefonod kamerájának (vagy ha régebbi a telefon, egy QR kód olvasó alkalmazás) segítségével olvasd be a kódot, majd navigálj a felugró oldalra. Ez lesz a te emlékadatlapod.
          </Text>
          <Text style={{ ...text, marginBottom: '24px'}}>
            Az oldal itt kérni fog tőled egy 6 számjegyű ellenőrző kódot, hogy véglegesen a te profilodhoz kapcsolja az adott adatlapod.
          </Text>
          <Text style={{ ...text, marginBottom: '24px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '8px', paddingTop: '8px', backgroundColor: '#701633', borderRadius: '32px', color: '#ffffff'}}>
            A te ellenőrző kódod a következő: <b><b>{secret}</b></b>
          </Text>
          <Text style={{ ...text, marginBottom: '24px'}}>
            Miután beírtad ezt a kódot, kattints az ellenőrzés gombra, és sikeres ellenőrzés után, már szerkesztheted is az emlékoldalt. Ezt az emlékoldalt a QR kódon kívül a weboldalon a profilodra kattintva is elérheted.
          </Text>
          <Text style={{ ...text, marginBottom: '24px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '8px', paddingTop: '8px', backgroundColor: '#2293a421', borderRadius: '32px', border: '1px solid #2292a4'}}>
            Tipp: Az egyszerű szerkesztési élmény miatt nem kell minden változtatás után rámenteni az adatlapra. Változtass meg mindent amit szeretnél, navigálj a lapok között és ha úgy érzed rendben van, akkor mentsd el. Így lényegesen egyszerűbb és élvezhetőbb a szerkesztés.
          </Text>
          <Text style={{...text}}>
            Kérdés esetén keress bátran bennünket az <a href='mailto:info@emlek-qr.hu' style={{...link}}>info@emlek-qr.hu</a> email címen, vagy a <a href='https://emlek-qr.hu/kapcsolat' target='__blank' style={{...link}}>kapcsolat</a> oldalon!
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default VasarlasUgyfel;
  
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