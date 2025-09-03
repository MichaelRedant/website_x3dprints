declare module "rehype-raw" {
  import type { Plugin } from "unified";
  // Plugin zonder opties; AST type houden we generiek
  const rehypeRaw: Plugin<[], unknown>;
  export default rehypeRaw;
}
