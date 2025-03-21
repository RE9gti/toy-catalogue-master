
import React, { ReactNode } from 'react';

type FormInputWithIconProps = {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  icon: ReactNode;
  required?: boolean;
};

export const FormInputWithIcon = ({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  label,
  icon,
  required = false,
}: FormInputWithIconProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium block">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
          required={required}
        />
      </div>
    </div>
  );
};
