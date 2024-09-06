import { evaluateJs } from "../repl";
import { GLOBAL_STATE } from "../state";

export function connectToMidi() {
    // Handle connection to available MIDI device
    // routed to MIDI_CONNECTION_CHANGE in setupMessages.js
    var connectionCode = `navigator.requestMIDIAccess()
    .then(midiController.onMIDISuccess.bind(midiController), midiController.onMIDIFailure.bind(midiController));`;
    evaluateJs(connectionCode);
}