import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FilterProps {
  options: {
    label: string;
    value: string;
  }[];
  filterPlaceholder?: string;
  className?: string;
}

export function Filter({
  options,
  className,
  filterPlaceholder = "Select a Filter",
}: FilterProps) {
  return (
    <Select>
      <SelectTrigger
        className={cn(
          "h-full w-fit border-none bg-background-lighter",
          className,
        )}
      >
        <SelectValue className="h-full" placeholder={filterPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
