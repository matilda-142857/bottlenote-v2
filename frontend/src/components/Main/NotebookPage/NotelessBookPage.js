import React, { useEffect, useState, useContext } from "react";
import dolphin from "../../../context/undefdolphin.png";
import waves from "../../../context/undefwaves.png";
import splash from "../../../context/undefsplash2.png";

const NoteLess = () => {
  return (
    <>
      <div className="note-page">
        <div className="undefined-graphic">
          <h3 className="undefined-text">
            Get started by creating or returning to a note ...
          </h3>
          <img className="undefined-dolphin"
                src={dolphin}
                alt="undefined-dolphin"
          />
          <img className="undefined-wave" 
                src={waves}     
                alt="undefined-dolphin" />
          <img className="undefined-splash"
                src={splash}
                alt="undefined-splash"
          />
        </div>
      </div>
    </>
  );
};

export default NoteLess;
