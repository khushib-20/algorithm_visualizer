import React, { useEffect } from 'react';

export default function Modal({ title, subtitle, onClose, footer, children }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__head">
          <div>
            <h2 className="modal__title">{title}</h2>
            {subtitle && <p className="modal__subtitle">{subtitle}</p>}
          </div>
          <button type="button" className="btn btn--sm" onClick={onClose} aria-label="Close">
            Close
          </button>
        </div>

        <div className="modal__body">{children}</div>

        {footer && <div className="modal__foot">{footer}</div>}
      </div>
    </div>
  );
}
