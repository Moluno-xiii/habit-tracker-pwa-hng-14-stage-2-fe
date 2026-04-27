import { CreateHabitDTO } from "@/types/habit";
import HabitForm from "../habits/HabitForm";
import Modal from "../shared/Modal";

interface Props {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onSubmitHabit: (data: CreateHabitDTO) => void;
}

const CreateHabitModal: React.FC<Props> = ({
  onCloseModal,
  isModalOpen,
  onSubmitHabit,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={onCloseModal}
      title="A new entry."
      eyebrow="Inscribe a habit"
    >
      <HabitForm onSubmit={onSubmitHabit} onCancel={onCloseModal} />
    </Modal>
  );
};

export default CreateHabitModal;
