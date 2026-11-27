import React, { useEffect, useRef } from "react";
import "./Modal.css";
import { BackButton } from "./BackButton";

const Modal = ({
  isOpen,
  onClose,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  children,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    const getFocusableElements = () =>
      [...modalElement.querySelectorAll(
        'a[href], button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',
      )].filter((element) => element.getClientRects().length > 0);

    const focusableElements = getFocusableElements();
    (focusableElements[0] ?? modalElement).focus();

    const keepFocusInside = (event) => {
      if (!modalElement.contains(event.target)) {
        (getFocusableElements()[0] ?? modalElement).focus();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (onClose) onClose();
        return;
      }


      if (event.key != "Tab") return;

      const elements = getFocusableElements();
      const first = elements[0];
      const last = elements.at(-1);

      if (!first) {
        event.preventDefault();
        modalElement.focus();
      } else if (!modalElement.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("focusin",keepFocusInside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("focusin",keepFocusInside)
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>

      <div id="overlay">

        <div id="content">
          <div
            ref={modalRef}
            role="dialog"
            tabIndex = {-1}
            aria-modal="true"
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            className="content"
          >
            <BackButton onClick={onClose} />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
