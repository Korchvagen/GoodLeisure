import React, { useState } from 'react';
import '../../styles/popup/popup-content.scss';
import { GetEmail } from './GetEmail.jsx';
import { CheckCode } from './CheckCode.jsx';
import { NewPassword } from './NewPassword';

export function AccountRecovery({ setActive }) {
  const [showEmailComponent, setShowEmailComponent] = useState(true);
  const [showCodeComponent, setShowCodeComponent] = useState(false);

  return (
    <div className="popup-content">
      <h2 className='popup-content__title'>Восстановление учетной записи</h2>
      <div className='popup-content__container'>
        { showEmailComponent && <GetEmail changeComponentEmail={setShowEmailComponent} changeComponentCode={setShowCodeComponent}/> }
        { showCodeComponent && <CheckCode changeComponentCode={setShowCodeComponent}/> }
        { (!showEmailComponent && !showCodeComponent) && <NewPassword changeComponentEmail={setShowEmailComponent} setActive={setActive}/>}
      </div>
    </div>
  );
}