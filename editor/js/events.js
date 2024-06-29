// imports as needed
import { evaluateJs, updatePreview } from "./repl";
import { GLOBAL_STATE } from "./state";

export function addEvents(state) {
  window.addEventListener("keydown", handleKeyPress);

  function handleKeyPress(event) {
    let keyCode = event.code;

    if (keyCode === "Enter" && event.shiftKey && event.metaKey) {
      event.preventDefault();
      console.log('START PRINT');
      evaluateJs("_fab.print();");
    } else if (keyCode === "Enter" && event.shiftKey) {
      event.preventDefault();
      console.log('RUN CODE');
      updatePreview(state);
    } else if (keyCode === "Slash" && event.metaKey) {
      editor.toggleComment();
    }
  }

  document.getElementById("file-upload").addEventListener("change", handleFileSelect, false);

  function handleFileSelect(event) {
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
  }

  function handleFileLoad(event) {
    console.log(event.target.result);
    setTemplate(event.target.result);
  }
}

export function setTemplate(text) {
  GLOBAL_STATE.codemirror.view.dispatch({
    changes: { from: 0, to: GLOBAL_STATE.codemirror.view.state.doc.length, insert: text }
  });
  updatePreview(GLOBAL_STATE);
}

export function saveSketch() {
  var sketchContents = GLOBAL_STATE.codemirror.view.state.doc.toString();
  var sketchBlob = new Blob([sketchContents], { type: "text/plain" });
  var downloadLink = document.createElement("a");
  downloadLink.download = "fab.js";
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    downloadLink.href = window.webkitURL.createObjectURL(sketchBlob);
  } else {
    downloadLink.href = window.URL.createObjectURL(sketchBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }
  downloadLink.click();
}

export async function setExample(ex) {
  let response = await fetch("./editor/js/examples/" + ex + ".js");
  let sketchContent = await response.text();
  console.log(sketchContent);
  setTemplate(sketchContent);
}

// async function setPrinter(p) {
  // let response = await fetch("printers/" + p + ".json");
  // let settings = await response.text();
//   evaluateJs(`_fab.configure(${settings});`);
// }

// document
//   .getElementById("file-upload")
//   .addEventListener("change", handleFileSelect, false);

// function handleFileSelect(event) {
//   const reader = new FileReader();
//   reader.onload = handleFileLoad;
//   reader.readAsText(event.target.files[0]);
// }

// function handleFileLoad(event) {
//   console.log(event.target.result);
//   editor.setValue(event.target.result);
// }

// function showInfoModal() {
//   var modal = document.getElementById("info-modal");
//   var span = document.getElementsByClassName("close")[0];
//   modal.style.display = "block";

//   span.onclick = function () {
//     modal.style.display = "none";
//   };
// }
