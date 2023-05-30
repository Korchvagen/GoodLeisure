import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/criteria.scss';
import { Criteria } from '../components/Criteria.jsx';
import { useTranslation } from 'react-i18next';

export const PickingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="criteria-page-rwapper">
      <p className='text-instruction'>{t('picking.text')}</p>
      <p className='text-question'>{t('picking.question')}</p>
      <div className="criteria-container">
        <Criteria />
      </div>
      <Link className='stop-selection-link' to={'/'}>{t('picking.stop-selection-link')}</Link>
    </div>
  )
}
