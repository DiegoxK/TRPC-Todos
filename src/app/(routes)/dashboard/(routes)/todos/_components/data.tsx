import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

import { z } from "zod";

export const PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;
export const STATUSES = ["TODO", "IN_PROGRESS", "DONE"] as const;

export const todoValidationSchema = z.object({
  task: z
    .string()
    .min(1, {
      message: "Task can't be empty",
    })
    .max(20, {
      message: "Task name must be at most 20 characters",
    }),
  projectId: z
    .string()
    .uuid({
      message: "Project is required",
    })
    .min(1, {
      message: "Project is required",
    }),
  description: z
    .string()
    .max(400, {
      message: "Description must be at most 400 characters",
    })
    .optional(),
  due: z.string().datetime().nullish(),
  priority: z.enum(PRIORITIES),

  status: z.enum(STATUSES),
});

export const statuses = [
  {
    value: "TODO",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "DONE",
    label: "Done",
    icon: CheckCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
