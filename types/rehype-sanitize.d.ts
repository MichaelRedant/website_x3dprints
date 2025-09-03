declare module "rehype-sanitize" {
  import type { Plugin } from "unified";

  // Minimal, maar strikt genoeg voor jouw gebruik
  export interface Schema {
    tagNames?: string[];
    attributes?: Record<string, Array<string | [string]>>;
    clobberPrefix?: string;
    clobber?: string[];
    strip?: string[];
    allowComments?: boolean;
  }

  export const defaultSchema: Schema;

  // Plugin met optioneel schema-argument
  const rehypeSanitize: Plugin<[Schema?], unknown>;
  export default rehypeSanitize;
}
