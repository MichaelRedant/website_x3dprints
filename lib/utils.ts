// /lib/utils.ts
// Eenvoudige 'cn' helper: voegt strings samen en filtert falsy values.
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
