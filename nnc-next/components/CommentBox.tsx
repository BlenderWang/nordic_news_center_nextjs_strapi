import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default function CommentBox({ comment, setComments }) {
    return (
        <TextareaAutosize
            aria-label="comments"
            rowsMin={3}
            placeholder="Say something about this"
            style={{ width: "100%" }}
            value={comment}
            onChange={setComments}
        />
    );
}
