import { evaluateJs } from "../repl";

export function checkMidiDevices() {
  // listen for midi devices changes
  // routed to MIDI_PORT_CHANGE in setupMessages.js
  evaluateJs(`navigator.requestMIDIAccess().then((access) => {
    access.onstatechange = (event) => {
        var messageData = {
            connected: event.port.state == "connected" ? true : false,
        }
        console.log("MIDI_PORT_CHANGE", messageData);
    };

    // get initial state
    var messageData = {
        connected: access.inputs.size ? true : false,       
    }
    console.log("MIDI_PORT_CHANGE", messageData);
  });`);
}
