import { Select, Option } from "@material-tailwind/react";
 
export function Dropdown() {
  return (
    <div className="custom-width" >
      <Select label="Price Range">
        <Option>&lt;1000</Option>
        <Option>1000-2000</Option>
        <Option>&gt; 2000</Option>
        <Option> Sign out</Option>
       
      </Select>
    </div>
  );
}