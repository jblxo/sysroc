import * as React from 'react';
import { TextField } from '@material-ui/core';
import { FieldProps } from 'formik';

interface Props extends FieldProps {
  type: string;
  placeholder: string;
  label: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
}

export const MyField: React.FC<Props> = ({
  type,
  placeholder,
  label,
  field,
  required,
  multiline,
  rows,
  rowsMax
}) => {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      label={label}
      required={required || false}
      multiline={multiline || false}
      rows={rows}
      rowsMax={rowsMax}
      {...field}
    />
  );
};
