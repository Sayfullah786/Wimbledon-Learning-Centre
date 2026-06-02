"use client";

const FormField = ({
  label,
  name,
  placeholder,
  error,
  textarea,
  select,
  options,
  value,
  onChange,
  required,
  ...props
}) => {
  // Render form field based on the prop types
  if (!textarea && !select && options) {
    console.error("Options can only be used with a select field.");
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-1 relative">
      <label htmlFor={name} className="ml-2 text-xs text-gray-400">
        {label} {required && "*"}
      </label>

      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={10}
          className="!outline-none w-full px-2 py-2 sm:py-3 rounded-lg placeholder-gray-400 focus:outline-none border border-black/30 focus:ring-2 focus:ring-main transition text-xs sm:text-sm"
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
      ) : select ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="!outline-none focus:border-cDark4 bg-cDark border border-cBorder rounded-md px-4 py-2 sm:py-3 text-base"
          required={required}
          {...props}
        >
          <option value="" disabled className="text-cGray">
            {placeholder}
          </option>
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          className="!outline-none w-full px-2 py-2 sm:py-3 rounded-lg placeholder-gray-400 focus:outline-none border border-black/30 focus:ring-2 focus:ring-main transition text-xs sm:text-sm"
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
      )}

      <small className="text-cRed text-xs p-1 absolute top-full left-0 w-full text-right">
        {error}
      </small>
    </div>
  );
};

export default FormField;
