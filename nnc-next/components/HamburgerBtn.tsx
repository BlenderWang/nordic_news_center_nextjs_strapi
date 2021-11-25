import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import Menu from "../assets/menu_customized.svg";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(1),
            color: "#4f4f4f",

            "& .MuiIconButton-label svg": {
                width: "36px",
                height: "36px",
            },

            [theme.breakpoints.up("md")]: {
                display: "none",
            },
        },
    })
);

const HamburgerBtn = ({ open, setOpen }) => {
    const classes = useStyles();

    return (
        <div onClick={() => setOpen()}>
            <IconButton className={classes.menuButton}>
                <Menu />
            </IconButton>
        </div>
    );
};

export default HamburgerBtn;
