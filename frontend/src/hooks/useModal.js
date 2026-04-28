import { useState, useCallback } from "react";

export default function useModal() {
  const [modal, setModal] = useState(null);

  const showModal = useCallback(({ title, message, onConfirm }) => {
    setModal({ title, message, onConfirm });
  }, []);

  const hideModal = useCallback(() => setModal(null), []);

  return { modal, showModal, hideModal };
}