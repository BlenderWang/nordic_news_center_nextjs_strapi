import React from "react";
import Link from "next/link";
import clsx from "clsx";
import CategoryMenu from "./CategoryMenu";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    Button,
    Menu,
    MenuItem,
    Fade,
    Typography,
    Slide,
    useScrollTrigger,
} from "@material-ui/core";
import HamburgerBtn from "./HamburgerBtn";
import { TCategory } from "../types";
import TitleNNC from "./TitleNNC";
import DropdownMenu from "./DropdownMenu";

interface IProps {
    window?: () => Window;
    children?: React.ReactElement;
    categories?: TCategory;
}

const useStyles = makeStyles((themes: Theme) =>
    createStyles({
        textClr: {
            color: "#4f4f4f",
        },
        root: {
            flexGrow: 1,
            boxShadow: "none",
            backgroundColor: "#ededed",
        },
        sitename: {
            flexGrow: 1,
            fontFamily: `Forum`,
            fontSize: "1.35em",
            marginLeft: themes.spacing(2),

            [themes.breakpoints.up("md")]: {
                fontSize: "1.65em",
            },
        },
        toolbar: {
            [themes.breakpoints.up("md")]: {
                paddingLeft: themes.spacing(5),
                paddingRight: themes.spacing(5),
            },
        },
        categoryMenu: {
            marginTop: themes.spacing(6),
        },
        categoryMenuHidden: {
            display: "none",
        },
    })
);

function HideOnScroll(props: IProps) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Header = (props: IProps) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const toggleHamburgerMenu = () => {
        setOpen(!open);
    };

    return (
        <>
            <HideOnScroll {...props}>
                <AppBar
                    position="fixed"
                    elevation={1}
                    color="transparent"
                    className={classes.root}
                >
                    <Toolbar className={classes.toolbar}>
                        <HamburgerBtn
                            open={open}
                            setOpen={toggleHamburgerMenu}
                        />

                        <TitleNNC page={" "} />

                        <DropdownMenu />
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <CategoryMenu categories={props.categories} open={open} />
        </>
    );
};

export default Header;
