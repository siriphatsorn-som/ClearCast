import useToast from "../hooks/useToast";
import useModal from "../hooks/useModal";
import Toast from "../components/Toast";
import Modal from "../components/Modal";
import { UIContext } from "./UIContext";

export default function UIProvider({ children }) {
  const { toast, showToast, hideToast } = useToast();
  const { modal, showModal, hideModal } = useModal();

  return (
    <UIContext.Provider value={{ showToast, showModal }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      {modal && <Modal {...modal} onClose={hideModal} />}
    </UIContext.Provider>
  );
}