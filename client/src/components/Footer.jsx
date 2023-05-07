import React from 'react';
import '../styles/footer.scss';

export function Footer(){
  return (
    <footer className='footer'>
      <div className="footer__container">
        <span className='footer__container__year'>2023</span>
        <a className='footer__container__author' href='https://github.com/Korchvagen' target='_blank'>By Korchvagen</a>
        <a className='footer__container__mail' href='mailto:korchikov_k@mail.ru'>korchikov_k@mail.ru</a>
      </div>
    </footer>
  );
}