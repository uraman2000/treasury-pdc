import React from "react";

interface IProps {
  props: any;
  value: string;
}
export default function TableTextField(props: IProps) {
  return (
    <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
      <input
        className="MuiInputBase-input MuiInput-input"
        placeholder={props.props.columnDef.title}
        type="text"
        required
        value={props.value}
        onChange={e => props.props.onChange(e.target.value)}
      />
    </div>
  );
}
