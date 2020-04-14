import * as React from 'react';
import { TextField } from '@material-ui/core';
import { FieldProps } from 'formik';

interface Props extends FieldProps {
  type: string;
  placeholder: string;
  label: string;
  className: string;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  min?: number;
  max?: number;
}

export const MyField: React.FC<Props> = ({
  type,
  placeholder,
  label,
  className,
  field,
  required,
  disabled,
  multiline,
  rows,
  rowsMax,
    min,
    max
}) => {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      label={label}
      className={className}
      required={required || false}
      disabled={disabled || false}
      multiline={multiline || false}
      rows={rows}
      rowsMax={rowsMax}
      inputProps={{
        min,
        max,
      }}
      {...field}
    />
  );
};
