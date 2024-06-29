import { init } from "./init.js";

window.addEventListener("load", async () => {
    if (window.self == window.top) {
        init();
    }
});