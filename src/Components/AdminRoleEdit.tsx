import React from "react";

interface IProps {
  access: any;
  location: any;
}
export default function AdminRoleEdit(props: IProps) {
  const data = props.location;
  console.log(data);
  return <div></div>;
}
