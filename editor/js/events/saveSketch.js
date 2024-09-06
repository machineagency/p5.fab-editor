import { GLOBAL_STATE } from "../state";

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