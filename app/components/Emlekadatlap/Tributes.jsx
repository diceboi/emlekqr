import TributeTile from "../UI/TributeTile";

export default function Tributes({ data, currenttributes, issession }) {
  const availableTributes = currenttributes.filter(
    (tribute) => tribute.verified === true
  );

  return (
    <>
      {!issession &&
        availableTributes.map((tribute, index) => (
          <TributeTile key={index} tribute={tribute} />
        ))}

      {issession &&
        currenttributes.map((tribute, index) => (
          <TributeTile key={index} tribute={tribute} />
        ))}
    </>
  );
}
