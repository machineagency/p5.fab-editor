import { EditorView, basicSetup } from "codemirror"
import { keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript"
import { EditorState, StateField } from "@codemirror/state";
import { syntaxTree, indentUnit } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";


export function initCodeMirror(el) {
    const keybindings = keymap.of([indentWithTab]);
    const extensions = [
        basicSetup, 
        javascript(),
        keybindings,
        indentUnit.of("  "),
    ]

    const state = EditorState.create({ extensions });

    const view = new EditorView({
      state,
      parent: el
    })

    // pos :: { column, line, index }
    const viewJumpTo = (pos) => {
      const offset = pos.index ?? view.state.doc.line(pos.line).from + pos.column
      view.dispatch({
        selection: {
          anchor: offset,
          head: pos.length ? offset + pos.length : offset
        },
        effects: EditorView.scrollIntoView(offset, {
          x: 'center',
          y: 'center'
        })
      })
      // focus the editor
      view.focus()
    }

    return {
        state, 
        view,
        foldRange() {},
        viewJumpTo
    }
}
