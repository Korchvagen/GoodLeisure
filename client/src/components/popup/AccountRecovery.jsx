import React, { useState } from 'react';
import '../../styles/popup-content.scss';
import { GetEmail } from './GetEmail.jsx';
import { CheckCode } from './CheckCode.jsx';

export function AccountRecovery() {
  const [showEmailComponent, setShowEmailComponent] = useState(true);
  return (
    <div className="popup-content">
      <h2 className='popup-content__title'>Восстановление учетной записи</h2>
      <div className='popup-content__container'>
        { showEmailComponent ? <GetEmail changeComponent={setShowEmailComponent}/> : <CheckCode />}
      </div>
    </div>
  );
}