import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > *": {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
            },
        },
    })
);

export default function ButtonGeneric ({ btnText, authenticated }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {authenticated ? (
                <Button type="submit" variant="contained" color="primary">
                    {btnText}
                </Button>
            ) : (
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled
                >
                    {btnText}
                </Button>
            )}
        </div>
    );
};
