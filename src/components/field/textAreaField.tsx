import React, { ChangeEvent } from 'react';

interface TextAreaFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  value,
  onChange,
  placeholder,
  className,
  required = false,
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={className}
    />
  );
};

export default TextAreaField;