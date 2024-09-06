import { updatePreview } from "../repl";
import { GLOBAL_STATE } from "../state";

export function setCmContent(text) {
    GLOBAL_STATE.codemirror.view.dispatch({
      changes: { from: 0, to: GLOBAL_STATE.codemirror.view.state.doc.length, insert: text }
    });
    updatePreview(GLOBAL_STATE);
  }