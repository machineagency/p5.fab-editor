import { GLOBAL_STATE } from "../state";

export function setPaneSizes(e) {
    const elId = e.srcElement.id;
    var pm;
    var idxToChange = 0;
    switch (elId) {
        case "machine-settings":
            pm = GLOBAL_STATE.paneManager['leftVerticalSplit'];
            break;
        case "video-content":
            pm = GLOBAL_STATE.paneManager['rightVerticalSplit'];
            idxToChange = 1;
        case "midi-content":
            pm = GLOBAL_STATE.paneManager['rightVerticalSplit'];
            idxToChange = 2;
        default:
            console.log('Unknown');
    }

    var closedThreshold = 10;
    switch (idxToChange) {
        case 0:
            // Open the machine settings pane if its closed, otherwise close it
            if (sizes[1] < closedThreshold) {
                pm.setSizes([50, 50]);
            }
            else {
                pm.setSizes([93, 7]);
            }
        case 1:
            if (sizes[1] < closedThreshold) {
                pm.setSizes([60, 20, 20]);
            }
            else {
                pm.setSizes([80, 0, 20]);
            }
    }
    if (leftSideFlag) {
        
    }
    else {
        // Right side has 3 panes

    }
    const sizes = pm.getSizes();


}