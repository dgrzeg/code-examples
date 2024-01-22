'use client';

import { FC, MouseEventHandler, useState } from 'react';
import Link from '../Link/Link';

type CookiesWarningProps = {
  cookieWarning: string
};

const CookiesWarning: FC<CookiesWarningProps> = ({ cookieWarning }) => {
  const [showCookieWarning, setShowCookieWarning] = useState(cookieWarning === '0');

  const onClickHandler: MouseEventHandler<HTMLSpanElement> = async (event) => {
    event.preventDefault();

    setShowCookieWarning(false);

    await fetch('/api/cookies', {
      method: 'POST',
      body: JSON.stringify({ cookiesWarning: '1' }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
  };

  return (
    <div className="cookies-warning" style={{ display: `${showCookieWarning ? 'block' : 'none'}` }}>
      <div className="cookies-warning-container container">
        <div className="cookies-text">
          W ramach naszej witryny stosujemy pliki cookies. Kontynuując przeglądanie strony, wyrażasz
          zgodę na używanie przez nas plików cookies.
          <Link href="/Polityka-plikow-Cookie">Czytaj więcej</Link>
        </div>
        <button
          className="btn btn-primary btn-light cookies-warning-close"
          onClick={onClickHandler}
          style={{ cursor: 'pointer' }}
        >
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default CookiesWarning;
