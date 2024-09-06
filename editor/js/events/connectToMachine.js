import { evaluateJs } from "../repl";

export function connectToMachine() {
    evaluateJs(`_fab.serial.requestPort()`);
}