import React, { useState } from 'react';
import '../../styles/popup/popup-content.scss';
import { GetEmail } from './GetEmail.jsx';
import { CheckCode } from './CheckCode.jsx';
import { NewPassword } from './NewPassword';
import { useTranslation } from 'react-i18next';

export function AccountRecovery({ setActive }) {
  const { t } = useTranslation();
  const [showEmailComponent, setShowEmailComponent] = useState(true);
  const [showCodeComponent, setShowCodeComponent] = useState(false);

  return (
    <div className="popup-content">
      <h2 className='popup-content__title'>{t('recovery.title')}</h2>
      <div className='popup-content__container'>
        { showEmailComponent && <GetEmail changeComponentEmail={setShowEmailComponent} changeComponentCode={setShowCodeComponent}/> }
        { showCodeComponent && <CheckCode changeComponentCode={setShowCodeComponent}/> }
        { (!showEmailComponent && !showCodeComponent) && <NewPassword changeComponentEmail={setShowEmailComponent} setActive={setActive}/>}
      </div>
    </div>
  );
}