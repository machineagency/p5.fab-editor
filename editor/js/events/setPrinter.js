import { evaluateJs, updatePreview } from "../repl";

export async function setPrinter(state, p) {
  let response = await fetch("./editor/printers/" + p + ".json");
  let settings = await response.text();
  evaluateJs(`fab.configure(${settings});`);
  updatePreview(state);
}