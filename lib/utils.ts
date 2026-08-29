export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatIndex(index: number, pad = 2) {
  return String(index).padStart(pad, "0");
}
