import { GLOBAL_STATE } from "./state.js";
import { view } from "./views/view.js";
import { render } from "lit-html";
import { addEvents, setTemplate } from "./events.js";
import { evaluateJs, updatePreview } from "./repl";
import { setupMessages } from "./setupMessages.js";
import Split  from "split.js";
import { initCodeMirror } from "./editor.js";
import { example } from "./examples/hollow-cube.js"; 
import { newTemplate } from "./examples/new.js";


// see if I need these/add others
// import { dispatch } from "./dispatch.js";
// import { urlToCode } from "./urlToCode.js";
// import { defaultText, basicSetup } from "./defaultText.js";
// import { logError } from "./logError.js";
// import { downloadText } from "./events/download.js";
// add window event listener

export function init() {
  render(view(GLOBAL_STATE), document.getElementById("root"));

  Split([".left-content", ".right-content"], {
    sizes: [50, 50],
    minSize: 0,
    gutterSize: 15,
  });
  Split([".content", ".midi-content"], {
    direction: 'vertical',
    sizes: [100, 0],
    minSize: 0,
    gutterSize: 15,
  });

  const codemirrorElement = document.querySelector(".code-editor");
  GLOBAL_STATE.codemirror = initCodeMirror(codemirrorElement);
  GLOBAL_STATE.sketchWindow = document.getElementById("preview").contentWindow;

  render(view(GLOBAL_STATE), document.getElementById("root"));

  setupMessages(GLOBAL_STATE);
  addEvents(GLOBAL_STATE); 
  // // addPageMsgListener(); // do i need?


  // TODO: local storage
  const saved = window.localStorage.getItem("p5.fab");
  GLOBAL_STATE.codemirror.view.dispatch({
    changes: { from: 0, insert: saved ?? example }
  });
}
