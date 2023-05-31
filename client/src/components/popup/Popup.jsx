import React from 'react';
import "../../styles/popup/popup.scss"

export function Popup({ active, setActive, setIsInfoEdit, children }) {
  const handleClosePopup = () => {
    if(setIsInfoEdit){
      setIsInfoEdit(true);
    }
    setActive(false);
  };

  return (
    <div className={active ? "popup-background active" : "popup-background"} onClick={handleClosePopup}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className='close-modal-btn' onClick={handleClosePopup}>
          <span></span>
          <span></span>
        </div>
        {children}
      </div>
    </div>
  );
}