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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

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
                "h-9 border-input pl-3 text-left font-normal",
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
          side="left"
          sideOffset={10}
          className="w-auto p-0"
          align="start"
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

export const InputText = ({ field }: InputProps) => {
  return (
    <FormItem>
      <FormControl>
        <Input
          className={cn("h-8 border-input", !field.value && "border-border")}
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
