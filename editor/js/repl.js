export function updatePreview(state) {
    const sketchCode = state.codemirror.view.state.doc.toString();

    // TODO: errors
    // JSHINT(sketchCode, { esversion: 6, undef: false, globals: { "windowWidth": true, "windowHeight": true, "createCanvas": true } })
    // console.log(JSHINT.data())
    // const errors = Array.isArray(JSHINT.errors) ? JSHINT.errors : [];

    try {
        var newp5 = `new p5()`; // pulling this out for now
        // if (!state.fabInit) {
        //     var newp5 = `new p5()`;
        // }
        // else {
        //     var newp5 = '';
        // }
        state.sketchWindow.eval(
            `
        function handleErrors(e) {
            console.log(e);
        }

        try { remove() } catch (e) { console.log('remove failed') }
        try { window.removeEventListener('error', handleErrors); } catch (e) { console.info('remove event listener failed') }
        window.addEventListener('error', handleErrors);
        (() => {
            return () => {
            ${sketchCode};
            try { window.setup = setup } catch (e) { console.log('se') }
            try { window.draw = draw } catch (e) { console.log('de') }
            try { window.windowResized = windowResized } catch (e) { console.log("no resize") };
            try { console.log(windowResized)}  catch (e) {console.log("e")};
            try { window.fabDraw = fabDraw } catch (e) { console.log('fde') };

            // try {
            //   window.windowResized = windowResized ?? null;
            //   window.keyPressed = keyPressed ?? null;
            //   window.preload = preload ?? null;
            //   window.mouseDragged = mouseDragged ?? null;
            //   window.preload = preload ?? null;
            // } catch (e) {window.parent.postMessage({ type: "error", body: e.toString() });}
            }
        })()()
        // new p5();
        ${newp5}
        `,
        );
        // flashCode(state);

        // if (!state.fabInit) {
        //     state.fabInit = true;
        // }
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.log('syntax')
            alert(e.message);
        } else {
            console.log('else')
            console.log(e);
        }
        // window.postMessage({ type: "error", body: e.stack.toString() })
        //   setOutput(false, [{ type: "error", body: e.toString() }]);
        //   globalState.output = [{ type: "error", body: e.toString() }];
    }
    state.sketchWindow.eval("_once = false;"); // to run fabDraw again
}

export function evaluateJs(code) {
    document.getElementById("preview").contentWindow.eval(code);
}

// functionality inspired from hydra, credit: https://github.com/hydra-synth/hydra/blob/aeea1cd794f9943356a5079b4911e9f8c3278bdc/frontend/web-editor/src/views/editor/editor.js#L122
function flashCode(state, start, end) {
    // need to update for cm6
    console.log("flash code!");
    console.log(state.codemirror);
    // highlight the code when you run it
    if (!start) start = { line: state.codemirror.view.state.doc.firstLine(), ch: 0 };
    if (!end) end = { line: state.codemirror.lastLine() + 1, ch: 0 };
    var marker = state.codemirror.markText(start, end, { className: "styled-background" });
    setTimeout(() => marker.clear(), 300);
}




// ********


// import { GLOBAL_STATE } from "./state.js";
// import { Parser } from "acorn";

// // export function
// export function evaluateJs(code) {
//     console.log('evaluating')
//     var errorState = {};

//     errorState = new Proxy({ message: "" }, {
//         set(target, prop, val) {
//             target[prop] = val;
//             var errorConsole = window.document.getElementById("error-log");
//             (val == "") ? errorConsole.style.display = "none" : errorConsole.style.display = "block";
//             errorConsole.innerHTML = val;
//             return true;
//         }
//     });

//      // there must be a better way to do this...
//     // can't handle code errors which happen in p5 loops (draw, etc) through try/catch-ing the eval()
//     // instead, inject try/catch loops here by iterating through the ast
//     try {
//         var ast = Parser.parse(code, { ecmaVersion: 2020 });
//         var codeToEval = ';'
//         var nodeBody = '';
//         errorState.message = "";
//         for (const n in ast['body']) {
//             var nodeBody = code.slice(ast['body'][n]['start'], ast['body'][n]['end']);
//             if (ast['body'][n]['type'] == 'FunctionDeclaration') {
//                 let functionDeclaration = code.slice(ast['body'][n]['start'], ast['body'][n]['body']['start'] + 1);
//                 let functionBody = code.slice(ast['body'][n]['body']['start'] + 1, ast['body'][n]['end'] - 1);
//                 nodeBody = functionDeclaration + '\ntry {\n' + functionBody + '\n}\ncatch (e){\nwindow.parent.errorState.message=e.message;\n}\n}\n'
//             }
//             codeToEval += nodeBody
//             // console.log(nodeBody)
//         }
//         // console.log(codeToEval)
//         let prev = document.getElementById('preview');
//         console.log(prev);
//         document.getElementById('preview').contentWindow.eval(codeToEval);
//         // document.getElementById('preview').contentWindow.eval(`try { remove() } catch (e) { console.log('remove failed') }`)
//         // document.getElementById('preview').contentWindow.eval(`new p5()`);
//         console.log('evald');
//     }
//     catch (e) {
//         console.log(e.message);
//         errorState.message = e.message;
//     }
// }