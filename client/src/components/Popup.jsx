import React from 'react';
import "../styles/popup.scss"

export function Popup({children}){
  return (
    <div className="popup-background">
      <div className="popup-container">
        {children}
      </div>
    </div>
  );
}