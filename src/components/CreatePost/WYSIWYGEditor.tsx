import React, {useState} from "react";

import {EditorState, convertToRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import "./WYSIWYGEditor.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {getNameValues} from "../../utils/functional";

type ContentFn = (current: string) => string;
interface WYSIWYGEditorProps {
    value: string;
    toChange: (fn: ContentFn) => void;
}

// todo: save value for editorState on reload
const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({value, toChange}) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    // React.useEffect(() => {
    //     getNameValues("values-text") !== null && setEditorState(getNameValues("values-text"))
    // }, [])
    const onEditorStateChange = (editorState: any) => {
        setEditorState(editorState);
        console.log("PROPS ==> ", value);
        localStorage.setItem("values-text", draftToHtml(convertToRaw(editorState.getCurrentContent())));
        return toChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    return (
        <React.Fragment>
            <div className="editor">
                <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    onEditorStateChange={onEditorStateChange}
                />
            </div>
        </React.Fragment>
    );
};

export default WYSIWYGEditor;
