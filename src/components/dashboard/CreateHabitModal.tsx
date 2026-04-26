import HabitForm from "../habits/HabitForm";
import Modal from "../shared/Modal";

interface Props {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

const CreateHabitModal: React.FC<Props> = ({ onCloseModal, isModalOpen }) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={onCloseModal}
      title="A new entry."
      eyebrow="Inscribe a habit"
    >
      <HabitForm onSubmit={onCloseModal} onCancel={onCloseModal} />
    </Modal>
  );
};

export default CreateHabitModal;
