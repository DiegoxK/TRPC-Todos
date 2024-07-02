/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { ControllerRenderProps } from "react-hook-form";

import { format } from "date-fns";
import { CalendarIcon, Check, ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { type Dispatch, type SetStateAction, useState } from "react";
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
}: InputProps & { values: string[] | (() => any) }) => {
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
                !field.value && "border-border text-muted-foreground",
              )}
            >
              {field.value ? field.value : "Search"}
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
              {values instanceof Function ? (
                <CommandValuesFromApi
                  field={field}
                  hook={values}
                  setOpen={setOpen}
                />
              ) : (
                <CommandValues
                  field={field}
                  values={values}
                  setOpen={setOpen}
                />
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

interface CommandValues {
  field: ControllerRenderProps<Record<string, any>, string>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface CommandValuesProps extends CommandValues {
  values: string[];
}

interface CommandValuesFromApiProps extends CommandValues {
  hook: () => any;
}

const CommandValuesFromApi = ({
  field,
  hook,
  setOpen,
}: CommandValuesFromApiProps) => {
  const { data: values, isLoading } = hook();

  if (isLoading)
    return (
      <CommandGroup>
        <CommandItem className="flex items-center justify-center p-3">
          <div className="loader" />
        </CommandItem>
      </CommandGroup>
    );

  return (
    <CommandGroup>
      {values.map((value: string) => (
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
  );
};

const CommandValues = ({ field, values, setOpen }: CommandValuesProps) => {
  return (
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
