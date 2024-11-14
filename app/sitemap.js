const getEmlekadatlap = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL; // Adjust this as per your environment
      const res = await fetch(`${baseUrl}/api/getAllEmlekadatlapok`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error("Az adatok letöltése nem sikerült");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Az adatok betöltése sikertlen", error);
      return null;
    }
};

export default async function sitemap() {

  const emlekadatlapok = await getEmlekadatlap();

  if (!emlekadatlapok || !emlekadatlapok.data) {
    console.log("Emlekadatlap data is unavailable.");
    return []; // Return an empty array or static URLs only
  }

  const Emlekadatlapok = emlekadatlapok.data.Emlekadatlap.map((emlekadatlap) => ({
    url: `https://www.emlek-qr.hu/emlekadatlapok/${emlekadatlap.uri}`,
  }));

  // Define the static URLs
  const staticUrls = [
    { url: 'https://www.emlek-qr.hu' },
    { url: 'https://www.emlek-qr.hu/bejelentkezes' },
    { url: 'https://www.emlek-qr.hu/elfelejtett-jelszo' },
    { url: 'https://www.emlek-qr.hu/elhunyt-jogainak-vedelme' },
    { url: 'https://www.emlek-qr.hu/erme' },
    { url: 'https://www.emlek-qr.hu/gyik' },
    { url: 'https://www.emlek-qr.hu/hasznalata' },
    { url: 'https://www.emlek-qr.hu/kapcsolat' },
    { url: 'https://www.emlek-qr.hu/nyeremenyjatek-szabalyzat' },
    { url: 'https://www.emlek-qr.hu/profil' },
    { url: 'https://www.emlek-qr.hu/regisztracio' },
    { url: 'https://www.emlek-qr.hu/rolunk' },
    { url: 'https://www.emlek-qr.hu/vasarlasi-feltetelek' },
  ];

  return [...staticUrls, ...Emlekadatlapok];
}
