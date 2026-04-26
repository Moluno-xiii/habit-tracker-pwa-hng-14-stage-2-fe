import { SubmitEvent } from "react";
import FormInput from "../ui/FormInput";

const HabitForm: React.FC = () => {
  const submitForm = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log("habit form data \n", data);
  };

  return (
    <form
      data-testid="habit-form"
      onSubmit={submitForm}
      className="flex flex-col gap-y-4"
    >
      <FormInput required={true} inputTestId="habit-name-input" label="name" />
      <div className="flex flex-col gap-y-1.5">
        <label htmlFor="description">Description</label>
        <textarea
          data-testid="habit-description-input"
          name="description"
          id=""
        />
      </div>
      <select name="daily" data-testid="habit-frequency-select">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button data-testid="habit-save-button">Submit</button>
    </form>
  );
};

export default HabitForm;
