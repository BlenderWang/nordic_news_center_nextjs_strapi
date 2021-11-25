import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            "& > * + *": {
                marginTop: theme.spacing(2),
            },
        },
    })
);

export default function SimpleAlert({ message }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Alert severity="error">{message}</Alert>
        </div>
    );
}
