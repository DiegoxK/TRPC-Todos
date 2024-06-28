import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { ControllerRenderProps } from "react-hook-form";

import { format } from "date-fns";
import { CalendarIcon, Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface InputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<Record<string, any>, string>;
}

export const InputDate = ({ field }: InputProps) => {
  return (
    <FormItem className="flex flex-col">
      <Popover modal={false}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "h-[37px] w-full border-input pl-3 text-left font-normal",
                !field.value && "border-border text-muted-foreground",
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          sideOffset={8}
          className="w-auto p-0"
        >
          <Calendar
            mode="single"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) => date < new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export const InputCommand = ({
  field,
  values,
}: InputProps & { values: string[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <FormItem className="flex flex-col">
      <Popover modal={false} open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "flex h-9 justify-between",
                !field.value && "text-muted-foreground",
              )}
            >
              {field.value
                ? values.find((value) => value === field.value)
                : "Select status"}
              <ChevronDown size={16} className="opacity-60" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          className="w-36 p-0"
          sideOffset={8}
          side="bottom"
          align="end"
        >
          <Command>
            <CommandInput className="capitalize" placeholder={field.name} />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {values.map((value) => (
                  <CommandItem
                    value={value}
                    key={value}
                    onSelect={() => {
                      setOpen(false);
                      field.onChange(value);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === field.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {value}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export const InputText = ({ field }: InputProps) => {
  return (
    <FormItem>
      <FormControl>
        <Input
          className={cn("h-9 border-input", !field.value && "border-border")}
          type="text"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export const InputNumber = ({ field }: InputProps) => {
  return (
    <FormItem>
      <FormControl>
        <Input className="h-8 border-border" type="number" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
