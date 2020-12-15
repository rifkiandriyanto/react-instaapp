import React from 'react';

import '../style/Footer.css';

export default function Footer() {
  return (
    <footer id='footer' className='footer'>
      <p>
        Made with ❤ by
        <a
          href='https://github.com/rifkiandriyanto'
          target='_blank'
          rel='noopener noreferrer'
        >
          {' '}
          Rifki Andriyanto{' '}
        </a>
        <br />
      </p>
    </footer>
  );
}
