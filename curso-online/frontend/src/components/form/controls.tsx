import React from "react";

interface InputProps {
  label: string;
  value: string;
  placeholder?: string;
  length?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextAreaProps {
  label: string;
  value: string;
  placeholder?: string;
  length?: boolean;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  placeholder = "",
  length = true,
  onChange,
}) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
        <span className="label-text-alt"></span>
      </div>
      <input
        type="text"
        placeholder={placeholder !== "" ? placeholder : "Escreva..."}
        className="input input-bordered w-full focus:outline-none focus:ring-0"
        onChange={onChange}
        value={value}
      />
      {length && (
        <div className="label">
          <span className="label-text-alt"></span>
          <span
            className={`label-text-alt ${value.length > 200 && "text-red-500"}`}
          >
            {value.length}/200
          </span>
        </div>
      )}
    </label>
  );
};

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  placeholder = "",
  length = true,
  onChange,
}) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
        <span className="label-text-alt"></span>
      </div>
      <textarea
        className="textarea textarea-bordered resize-none focus:outline-none focus:ring-0"
        rows={5}
        placeholder={placeholder !== "" ? placeholder : "Escreva..."}
        onChange={onChange}
        value={value}
      ></textarea>
      {length && (
        <div className="label">
          <span className="label-text-alt"></span>
          <span
            className={`label-text-alt ${value.length > 500 && "text-red-500"}`}
          >
            {value.length}/500
          </span>
        </div>
      )}
    </label>
  );
};

export { Input, TextArea };
