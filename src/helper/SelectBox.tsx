import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
type SelectBoxProps = {
  gender: string;
  onChange: (value: string) => void;
};
const SelectBox = ({ gender, onChange }: SelectBoxProps) => {
  return (
    <Select value={gender} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
