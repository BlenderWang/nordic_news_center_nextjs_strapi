import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { Typography } from "@material-ui/core";
import { signIn, signOut, useSession } from "next-auth/client";

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
        logoLink: {
            color: themes.palette.info.main,
            display: "none",

            [themes.breakpoints.up("md")]: {
                display: "block",
            },

            "& svg": {
                width: themes.spacing(9),
            },
        },
        loginButton: {
            margin: 0,

            "& .MuiTypography-root": {
                display: "none",

                [themes.breakpoints.up("md")]: {
                    display: "block",
                    marginLeft: themes.spacing(1),
                },
            },

            "& .MuiButton-label": {
                alignItems: "center",
            },
        },
    })
);

const DropdownMenu = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [session, loading] = useSession();

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignUp = e => {
        e.prevendDefault()
        console.log('signed up');
    }

    return (
        <>
            <Button
                className={clsx(classes.loginButton, classes.textClr)}
                aria-label="account of current user"
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
            >
                <AccountCircleRoundedIcon />

                {session ? (
                    <Typography variant="body2">
                        {session.user.name}
                    </Typography>
                ) : (
                    <Typography variant="body2">Konto</Typography>
                )}
            </Button>

            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {!session && (
                    <div>
                        <MenuItem onClick={() => signIn()}>Logga In</MenuItem>
                        <MenuItem onClick={handleSignUp}>Registrera</MenuItem>
                    </div>
                )}

                {session && (
                    <MenuItem onClick={() => signOut()}>
                        Logga Ut
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};

export default DropdownMenu;
