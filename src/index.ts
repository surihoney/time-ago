const MS_SECOND = 1000;
const MS_MINUTE = 60 * MS_SECOND;
const MS_HOUR = 60 * MS_MINUTE;
const MS_DAY = 24 * MS_HOUR;
const MS_WEEK = 7 * MS_DAY;
const MS_MONTH = 30 * MS_DAY;
const MS_YEAR = 365 * MS_DAY;

const SMALL_WORDS: Record<number, string> = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
};

export type TimeInput = Date | number | string;

export type NumberStyle = "numeric" | "words";

export interface TimeAgoOptions {
  // How to render the count: digits (`1`) or English words (`one`).
  numberStyle?: NumberStyle;
  // Time treated as “now” (for tests). Defaults to `Date.now()`.
  now?: Date | number;
  // Label when the difference is under ~5 seconds.
  justNow?: string;
}

function toMs(input: TimeInput): number {
  if (input instanceof Date) return input.getTime();
  if (typeof input === "number") return input;
  const t = Date.parse(input);
  if (Number.isNaN(t)) throw new TypeError(`Invalid date string: ${JSON.stringify(input)}`);
  return t;
}

function formatCount(n: number, style: NumberStyle): string {
  if (style === "numeric") return String(n);
  const w = SMALL_WORDS[n];
  return w ?? String(n);
}

function plural(unit: string, n: number): string {
  if (n === 1) return unit;
  if (unit.endsWith("s")) return `${unit}es`;
  return `${unit}s`;
}

type Unit = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";

function phrase(value: number, unit: Unit, numberStyle: NumberStyle): string {
  const count = formatCount(value, numberStyle);
  return `${count} ${plural(unit, value)} ago`;
}

export function timeAgo(input: TimeInput, options: TimeAgoOptions = {}): string {
  const { numberStyle = "numeric", now: nowInput, justNow = "just now" } = options;
  const nowMs = nowInput === undefined ? Date.now() : toMs(nowInput as TimeInput);
  const thenMs = toMs(input);
  let diff = nowMs - thenMs;
  if (diff < 0) {
    throw new RangeError("timeAgo only supports past timestamps relative to now");
  }
  if (diff < 5 * MS_SECOND) return justNow;

  if (diff < MS_MINUTE) {
    const s = Math.max(1, Math.floor(diff / MS_SECOND));
    return phrase(s, "second", numberStyle);
  }
  if (diff < MS_HOUR) {
    const m = Math.max(1, Math.floor(diff / MS_MINUTE));
    return phrase(m, "minute", numberStyle);
  }
  if (diff < MS_DAY) {
    const h = Math.max(1, Math.floor(diff / MS_HOUR));
    return phrase(h, "hour", numberStyle);
  }
  if (diff < MS_WEEK) {
    const d = Math.max(1, Math.floor(diff / MS_DAY));
    return phrase(d, "day", numberStyle);
  }
  if (diff < MS_MONTH) {
    const w = Math.max(1, Math.floor(diff / MS_WEEK));
    return phrase(w, "week", numberStyle);
  }
  if (diff < MS_YEAR) {
    const mo = Math.max(1, Math.floor(diff / MS_MONTH));
    return phrase(mo, "month", numberStyle);
  }
  const y = Math.max(1, Math.floor(diff / MS_YEAR));
  return phrase(y, "year", numberStyle);
}
