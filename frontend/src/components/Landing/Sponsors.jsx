import { useEffect } from 'react';
import './Sponsors.css';

export default function Sponsors() {
  const sponsors = [
    'images/ynov.png',
    'images/intellico.png',
    'images/tijari.png',
    'images/mundiapolis.png',
    'images/involys.png',
    'images/mc.png',
    'images/ofppt-logo.png',
  ];

  useEffect(() => {
    const container = document.querySelector('.sponsor-container');
    const clone = container.innerHTML;
    container.innerHTML += clone;
  }, []);

  return (
    <div className="sponsor-wrapper">
      <div className="sponsor-container">
        {sponsors.map((src, index) => (
          <img key={index} src={src} alt={`Sponsor ${index}`} />
        ))}
      </div>
    </div>
  );
}
