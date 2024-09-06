import { evaluateJs, updatePreview } from "../repl";
import { GLOBAL_STATE } from "../state";
import { stopRecordingCamera } from "./connectToCamera";

export function stopPrint() {
    evaluateJs(`_fab.stopPrint()`);
    updatePreview(GLOBAL_STATE);
    stopRecordingCamera();
}