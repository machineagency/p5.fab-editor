// import { updatePreview } from "./repl";
import { evaluateJs, updatePreview } from "./repl";

export function setupMessages(state) {
    window.addEventListener("message", function (e) {
        var message = e.data;
        var messageType = message.type;
        var messageBody = message.body;

        // handle info from the p5 friendly error system
        function handleFES() {
            if (messageBody.includes('p5 says:')) { // this is how all p5 FES messages start
                // store this info somewhere
            }
        }

        switch (messageType) {
            case 'log':
                // console.log(messageBody);
                break;
            case 'error':
                // console.error(messageBody);
                console.log(e);
                break;
            case 'ready':
                console.log('ready')
                if (state.initialized) return;
                if (
                    document.readyState === "complete" ||
                    document.readyState === "loaded"
                ) {
                    console.log('complete!');
                    // state.initialized = true;
                    console.debug("Sketch frame is ready");
                    updatePreview(state);
                } else {
                    console.log('adding event listener');
                    window.addEventListener("DOMContentLoaded", init, { once: true });
                }
        }
    });
}