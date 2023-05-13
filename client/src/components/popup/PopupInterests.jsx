import React from 'react';
import "../../styles/popup/popup.scss"

export function PopupInterests({active, children}){
  return (
    <div className={active ? "popup-background active" : "popup-background"}>
      <div className="popup-container">
        {children}
      </div>
    </div>
  );
}