import React from "react";
import Link from "next/link";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Breadcrumbs, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(9),
            marginLeft: theme.spacing(5),

            [theme.breakpoints.up("md")]: {
                margin: theme.spacing(6),
            },
        },
        customFont: {
            color: theme.palette.neutral.main,
        },
    })
);

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
}

export default function CustomBreadcrumbs({ homepage, currentPage }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link href="/">
                    <a className={classes.customFont}>{homepage}</a>
                </Link>
                <Typography color="textSecondary">{currentPage}</Typography>
            </Breadcrumbs>
        </div>
    );
}
