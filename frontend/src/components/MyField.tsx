import * as React from 'react';
import { TextField } from '@material-ui/core';
import { FieldProps } from 'formik';

interface Props extends FieldProps {
  type: string;
  placeholder: string;
  label: string;
}

export const MyField: React.FC<Props> = ({
  type,
  placeholder,
  label,
  field
}) => {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      label={label}
      {...field}
      required
    />
  );
};
