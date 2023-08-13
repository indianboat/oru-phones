import { Field } from 'formik';
import React from 'react';

const InputComponent = ({label, type, placeholder, id, name, isRequired, maxLength, minLength, isWidthFull="" }) => {
  return (

    <div className={`flex flex-col ${isWidthFull}`}>
      <label
        htmlFor={id}
        className="text-slate-600 dark:text-slate-200 text-sm"
      >
        {label}{isRequired?"*":null}
      </label>
      <div className="mt-1 flex items-center justify-end">
        <Field
          className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
          type={type}
          placeholder={placeholder}
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          name={name}
          required={isRequired}
          spellCheck={false}
        />
      </div>
    </div>

  )
}

export default InputComponent