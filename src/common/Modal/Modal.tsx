import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children }: any) {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="card z-10 w-full max-w-md">
        {children}
      </div>
    </div>,
    document.body
  );
}
