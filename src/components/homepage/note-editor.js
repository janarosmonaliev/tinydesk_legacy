import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "../../styles/rich-editor.css";

const { useState, useRef, useCallback } = React;

function RichEditor(props) {
  const editor = useRef(null);

  const focus = () => {
    if (editor.current) editor.current.focus();
    // setEditorState(EditorState.createWithContent(props.content));
    // console.log(editorState.getCurrentContent());
  };

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        props.setRichEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    [props.richEditorState, props.setRichEditorState]
  );

  const mapKeyToEditorCommand = useCallback(
    (e) => {
      switch (e.keyCode) {
        case 9: // TAB
          const newEditorState = RichUtils.onTab(
            e,
            props.richEditorState,
            4 /* maxDepth */
          );
          if (newEditorState !== props.richEditorState) {
            props.setRichEditorState(newEditorState);
          }
          return null;
      }
      return getDefaultKeyBinding(e);
    },
    [props.richEditorState, props.setRichEditorState]
  );

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = "RichEditor-editor";
  var contentState = props.richEditorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={props.richEditorState}
        onToggle={(blockType) => {
          const newState = RichUtils.toggleBlockType(
            props.richEditorState,
            blockType
          );
          props.setRichEditorState(newState);
        }}
      />
      <InlineStyleControls
        editorState={props.richEditorState}
        onToggle={(inlineStyle) => {
          const newState = RichUtils.toggleInlineStyle(
            props.richEditorState,
            inlineStyle
          );
          props.setRichEditorState(newState);
        }}
      />
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={props.richEditorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={props.setRichEditorState}
          placeholder="Tell a story..."
          ref={editor}
          spellCheck={true}
          // readOnlyx
        />
      </div>
    </div>
  );
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

function StyleButton({ onToggle, active, label, style }) {
  let className = "RichEditor-styleButton";
  if (active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span
      className={className}
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(style);
      }}
    >
      {label}
    </span>
  );
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

function BlockStyleControls({ editorState, onToggle }) {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

function InlineStyleControls({ editorState, onToggle }) {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

export default RichEditor;
