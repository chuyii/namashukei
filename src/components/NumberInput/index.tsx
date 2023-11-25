import { useState } from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

export default function NumberInput({
  className,
  register,
  unit,
  disabled,
  isInvalid,
}: {
  className?: string;
  register?: UseFormRegisterReturn;
  unit?: string;
  disabled?: boolean;
  isInvalid?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <label
      className={`inline-flex items-center rounded-lg border outline outline-2 outline-offset-[-2px] transition-[background-color,border-color,outline-color] ${
        disabled
          ? 'border-gray-200 bg-gray-50'
          : `bg-white ${
              isInvalid
                ? `border-red-500 ${isFocused ? 'outline-red-500' : ''}`
                : `border-gray-400 ${isFocused ? 'outline-emerald-400' : ''}`
            }`
      } ${!isFocused ? 'outline-transparent' : ''} ${className ?? ''}`}
    >
      <input
        className={`w-full bg-transparent py-3 pl-4 text-xl outline-none ${
          !unit ? 'pr-4' : ''
        }`}
        {...register}
        autoComplete="off"
        type="number"
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {unit && (
        <p
          className={`py-3 pl-2 pr-4 text-xl text-gray-600 ${
            disabled ? '' : 'cursor-text'
          }`}
        >
          {unit}
        </p>
      )}
    </label>
  );
}
