import React from 'react';
import '../styles/structure/main.scss';

export function Main({ children }) {
  return (
    <main className='main'>
      <div className="main__container">
        { children }
      </div>
    </main>
  );
}