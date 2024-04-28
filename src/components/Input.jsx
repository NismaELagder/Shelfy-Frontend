import React from "react";

const Input = ({
  label,
  name,
  type,
  value,
  className,
  onChange,
  accept,
}) => {
  return (
    <div className={className}>
      <label htmlFor="" className="text-sm font-semibold">
        {label}
      </label>
      {type == "textarea" ? (
        <textarea
          className="border w-full rounded py-1 border-stone-200 px-2 placeholder-stone-300 block placeholder:text-sm"
          placeholder={label}
          name={name}
          onChange={(e) => onChange(e)}
          value={value}
        />
      ) : (
        <input
          className={`border w-full rounded py-1 border-stone-200 px-2 placeholder-stone-300 block placeholder:text-sm`}
          placeholder={label}
          type={type}
          name={name}
          onChange={(e) => onChange(e)}
          accept={type === "file" ? accept : undefined}
          value={type !== "file" ? value : undefined}
        />
      )}
    </div>
  );
};

export default Input;
