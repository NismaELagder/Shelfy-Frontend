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
    <div className="w-full">
      {/* <label htmlFor="" className="text-sm font-medium">
        {label}
      </label> */}
      {type == "textarea" ? (
        <textarea
          className="block border w-full rounded border-stone-200 placeholder-stone-500 px-3 py-1 mt-4 focus:border-stone-700 focus:border-2 focus:outline-none"
          placeholder={label}
          name={name}
          onChange={(e) => onChange(e)}
          value={value}
        />
      ) : (
        <input
          className="block border w-full rounded border-stone-200 placeholder-stone-500 px-3 py-1 mt-4 focus:border-stone-700 focus:border-2 focus:outline-none"
          placeholder={label}
          type={type}
          name={name}
          // required
          onChange={(e) => onChange(e)}
          accept={type === "file" ? accept : undefined}
          value={type !== "file" ? value : undefined}
        />
      )}
    </div>
  );
};

export default Input;
