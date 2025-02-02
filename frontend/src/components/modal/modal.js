import React, {useEffect, useState} from 'react';
import './modal.css';

export default function Modal({ onClose, children }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}>
                    &times;
                </button>

                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}
