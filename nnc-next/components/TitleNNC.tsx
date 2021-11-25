import React from "react";
import Link from "next/link";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { globalTheme } from "../styles/theme";
import Logo from "../assets/nnc_logo.svg";

const useStyles = makeStyles((themes: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            boxShadow: "none",
            backgroundColor: "#ededed",
            paddingLeft: themes.spacing(3),

            [themes.breakpoints.up("md")]: {
                paddingLeft: 0,
            },
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
        logoLink: {
            color: `${globalTheme.palette.info.main}`,

            [themes.breakpoints.up("md")]: {
                display: "block",
            },

            "& svg": {
                width: themes.spacing(5),

                [themes.breakpoints.up("md")]: {
                    width: themes.spacing(9),
                },
            },
        },
        display: {
            display: "none",

            [themes.breakpoints.up("md")]: {
                display: "block",
            },
        },
        textClr: {
            color: globalTheme.palette.neutral.main,
        },
    })
);

const TitleNNC = ({ page }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {page === "auth" ? (
                <Link href="/">
                    <a className={classes.logoLink}>
                        <Logo />
                    </a>
                </Link>
            ) : (
                <Link href="/">
                    <a className={clsx(classes.display, classes.logoLink)}>
                        <Logo />
                    </a>
                </Link>
            )}
            <Link href="/">
                <a>
                    <Typography
                        variant="h2"
                        component="h1"
                        className={clsx(classes.sitename, classes.textClr)}
                    >
                        Nordic News Center
                    </Typography>
                </a>
            </Link>
        </div>
    );
};

export default TitleNNC;
