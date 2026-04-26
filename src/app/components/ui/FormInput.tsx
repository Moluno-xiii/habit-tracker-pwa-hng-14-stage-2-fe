"use client";

import { useState } from "react";

type Props = {
  label: string;
  inputTestId: string;
  type?: string;
  required?: boolean;
};

const FormInput: React.FC<Props> = ({
  label,
  inputTestId,
  required = false,
  type = "text",
}) => {
  const [showInput, setShowInput] = useState(true);
  return (
    <div className="fles flex-col gap-y-1.5">
      <label htmlFor={label} className="capitalize">
        {label}
      </label>
      <input
        required={required}
        data-testid={inputTestId}
        type={showInput ? "text" : "password"}
        name={label}
      />
    </div>
  );
};

export default FormInput;
