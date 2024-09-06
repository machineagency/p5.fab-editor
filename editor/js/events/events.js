// imports as needed
import { evaluateJs, updatePreview } from "../repl";
import { GLOBAL_STATE } from "../state";
import { setCmContent } from "./setCmContent";
import { highlightSelection } from "../editor";

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
      // highlightSelection(state.codemirror.view);
      updatePreview(state);
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
    setCmContent(event.target.result);
  }
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
