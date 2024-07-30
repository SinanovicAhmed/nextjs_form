import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { JobFilterValues } from "./validation";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const calculateDateGap = (from: Date) => {
  return formatDistanceToNowStrict(from, { addSuffix: true });
};

export const generatePageHeader = ({
  q,
  location,
  type,
  arrangement,
}: JobFilterValues) => {
  const firstPhrase = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : arrangement
        ? `${arrangement} developer jobs`
        : "Developer jobs";

  const secondPhrase = location ? ` in ${location}` : "";

  return `${firstPhrase} ${secondPhrase}`;
};

export function createSlug(str: string) {
  const slug = str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  return `${slug}-${nanoid(10)}`;
}
