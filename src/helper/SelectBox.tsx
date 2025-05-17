import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SelectBox = () => {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sex" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
