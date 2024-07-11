import { Button } from "@/components/ui/button";
import { FormControl, FormTableItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { ControllerRenderProps } from "react-hook-form";

import { format } from "date-fns";
import { CalendarIcon, Check, ChevronDown, CirclePlus } from "lucide-react";
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
import type { TodoValidationSchema, ValidationKeys } from "./data";
import type { GetValuesQuery } from "./columns";
import { Separator } from "@/components/ui/separator";

interface InputProps {
  field: ControllerRenderProps<TodoValidationSchema, ValidationKeys>;
}

interface CommandValues extends InputProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface ApiCommandValuesProps extends CommandValues {
  values?: { id: string; label: string }[];
  isLoading: boolean;
  isError: boolean;
}

export const InputText = ({ field }: InputProps) => {
  return (
    <FormTableItem>
      <FormControl>
        <Input
          className={cn("h-9 border-input", !field.value && "border-border")}
          type="text"
          {...field}
        />
      </FormControl>
    </FormTableItem>
  );
};

export const InputNumber = ({ field }: InputProps) => {
  return (
    <FormTableItem>
      <FormControl>
        <Input className="h-8 border-border" type="number" {...field} />
      </FormControl>
    </FormTableItem>
  );
};

export const InputDate = ({ field }: InputProps) => {
  return (
    <FormTableItem className="flex flex-col">
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
          align="start"
          sideOffset={8}
          className="w-auto p-0"
        >
          <Calendar
            mode="single"
            selected={new Date(field.value ?? new Date())}
            onSelect={(date) => {
              field.onChange(date?.toISOString());
            }}
            disabled={(date) => date < new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </FormTableItem>
  );
};

export const InputCommand = ({
  field,
  values,
}: InputProps & { values: string[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <FormTableItem className="flex flex-col">
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
              {field.value ?? "Search"}
              <ChevronDown size={16} className="opacity-60" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          className="popover-content min-w-32 p-0"
          sideOffset={8}
          side="bottom"
          align="start"
        >
          <Command>
            <CommandInput className="capitalize" placeholder={field.name} />
            <CommandList>
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
              <CommandEmpty>No results found.</CommandEmpty>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormTableItem>
  );
};

export const ApiInputCommand = ({
  field,
  query,
}: InputProps & { query: GetValuesQuery }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setinputValue] = useState<string>("");

  const { data: values, isLoading, isError } = query();

  const alreadyExists = values?.some(
    (value) => value.label.toLowerCase() === inputValue.toLowerCase(),
  );

  return (
    <FormTableItem className="flex flex-col">
      <Popover
        modal={false}
        open={open}
        onOpenChange={(openChange) => {
          setOpen(openChange);
          setinputValue("");
        }}
      >
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "flex h-9 justify-between overflow-hidden",
                !field.value && "border-border text-muted-foreground",
              )}
            >
              {field.value && values
                ? values.find(
                    (value: { id: string; label: string }) =>
                      value.id === field.value,
                  )?.label
                : "Search"}

              <ChevronDown size={16} className="opacity-60" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        {/* TODO: Fix Z-indexes */}
        {/* TODO: Prevent scrolling when modal is open */}
        <PopoverContent
          className="popover-content min-w-56 p-0"
          sideOffset={8}
          side="bottom"
          align="start"
        >
          <Command>
            <CommandInput
              onChangeCapture={(e) => setinputValue(e.currentTarget.value)}
              className="capitalize"
              placeholder={field.name}
            />
            <CommandList>
              <CommandGroup>
                <ApiCommandValues
                  field={field}
                  setOpen={setOpen}
                  values={values}
                  isLoading={isLoading}
                  isError={isError}
                />
              </CommandGroup>

              {inputValue && !alreadyExists && (
                <>
                  <Separator />
                  <div className="m-1 flex select-none items-center gap-2 rounded-sm p-2 hover:bg-[#18151e]">
                    <CirclePlus className="min-w-[18px] opacity-50" size={18} />
                    <p className="truncate text-sm capitalize">{inputValue}</p>
                  </div>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormTableItem>
  );
};

const ApiCommandValues = ({
  field,
  setOpen,
  values,
  isLoading,
  isError,
}: ApiCommandValuesProps) => {
  if (isLoading)
    return (
      <CommandItem className="flex items-center justify-center p-3">
        <div className="loader" />
      </CommandItem>
    );

  if (isError || !values) {
    return (
      <CommandItem className="flex items-center justify-center p-3">
        <span className="text-red-500">Error loading values</span>
      </CommandItem>
    );
  }

  return (
    <>
      {values.map((value: { id: string; label: string }) => (
        <CommandItem
          value={value.label}
          key={value.id}
          onSelect={() => {
            setOpen(false);
            field.onChange(value.id);
          }}
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              value.id === field.value ? "opacity-100" : "opacity-0",
            )}
          />
          {value.label}
        </CommandItem>
      ))}
    </>
  );
};
