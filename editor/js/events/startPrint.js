import { evaluateJs } from "../repl";
import { recordCamera } from "./connectToCamera";

export function startPrint() {
    evaluateJs(`_fab.print()`);
    recordCamera();
}