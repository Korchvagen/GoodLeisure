import React from 'react';
import "../../styles/popup/popup.scss"

export function Popup({active, setActive, children}){
  return (
    <div className={active ? "popup-background active" : "popup-background"} onClick={() => setActive(false)}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className='close-moddal-btn' onClick={() => setActive(false)}>
          <span></span>
          <span></span>
        </div>
        {children}
      </div>
    </div>
  );
}