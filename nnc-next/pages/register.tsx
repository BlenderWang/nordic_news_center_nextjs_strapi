import React from "react";
import Link from "next/link";
import Router from "next/router";
import clsx from "clsx";
import { loadCSS } from "fg-loadcss";
import {
    CssBaseline,
    Container,
    Button,
    Divider,
    Grid,
    Typography,
    TextField,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import TitleNNC from "../components/TitleNNC";
import FormContainer from "../components/FormContainer";
import NewsArt from "../assets/nnc_News_art.svg";
import axios from "axios";
import { parseCookies, setCookie } from "nookies";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up("md")]: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
            },

            "& > *": {
                margin: theme.spacing(1),
            },
        },
        loginTitle: {
            fontFamily: `Antonio`,
            fontSize: "1.25em",
            marginTop: theme.spacing(9),

            [theme.breakpoints.up("md")]: {
                fontSize: "1.45em",
            },
        },
        actionBtn: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        withGoogleBtn: {
            background: theme.palette.neutral.light,
            color: theme.palette.neutral.dark,
            width: "100%",

            "& .fa-google": {
                color: theme.palette.primary.dark,
                marginRight: theme.spacing(1),
            },
        },
        form: {
            "& > *": {
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(1),
            },
        },
        loginBtn: {
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            border: `1px solid ${theme.palette.primary.main}`,

            "&:hover": {
                background: theme.palette.primary.contrastText,
                color: theme.palette.primary.main,
            },
        },
        newsArtDiv: {
            display: "none",

            [theme.breakpoints.up("md")]: {
                display: "block",
            },
        },
        linkColor: {
            color: theme.palette.primary.main,

            "&:hover": {
                color: theme.palette.primary.dark,
            },
        },
    })
);

const Register = () => {
    const classes = useStyles();

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    /* Google icon */
    React.useEffect(() => {
        const node = loadCSS(
            "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
            document.querySelector("#font-awesome-css")
        );

        return () => {
            node.parentNode!.removeChild(node);
        };
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("type in email and password");
        }

        const res = await axios.post(
            "http://localhost:1337/auth/local/register",
            {
                username,
                email,
                password,
            }
        );

        setCookie(null, "token", res.data.jwt, {
            path: "/",
        });

        Router.push("/");
    };

    return (
        <Container maxWidth="lg">
            <CssBaseline />

            <TitleNNC page={"auth"} />

            <Grid container spacing={1} className={classes.root}>
                <Grid item>
                    <FormContainer>
                        <Typography
                            component="h2"
                            variant="h3"
                            gutterBottom
                            align="center"
                            className={classes.loginTitle}
                        >
                            Registering
                        </Typography>

                        <Button
                            variant="contained"
                            className={clsx(
                                classes.actionBtn,
                                classes.withGoogleBtn
                            )}
                            disableElevation
                        >
                            <Icon className="fab fa-google" />
                            Koppla med Google
                        </Button>

                        <Divider variant="fullWidth" />

                        <form
                            className={classes.form}
                            noValidate
                            autoComplete="off"
                            onSubmit={submitHandler}
                        >
                            <TextField
                                required
                                label="Användarnamn"
                                type="username"
                                placeholder="John Doe"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                required
                                label="E-post"
                                type="email"
                                placeholder="john@email.com"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                required
                                label="Lösenord"
                                type="password"
                                placeholder="Lösenord"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="outlined"
                                className={clsx(
                                    classes.actionBtn,
                                    classes.loginBtn
                                )}
                            >
                                Registrera
                            </Button>
                        </form>

                        <Typography>
                            Har du redan ett konto?{" "}
                            <Link href="/login">
                                <a className={classes.linkColor}>Logga in</a>
                            </Link>
                        </Typography>
                    </FormContainer>
                </Grid>

                <Grid item className={classes.newsArtDiv}>
                    <NewsArt />
                </Grid>
            </Grid>
        </Container>
    );
};

Register.getInitialProps = (ctx) => {
    const isAuthenticated = !!parseCookies(ctx).token;

    if (isAuthenticated && ["/register", "/login"].indexOf(ctx.asPath) > -1) {
        if (typeof window !== "undefined") {
            Router.push("/");
        } else {
            if (ctx.res) {
                ctx.res.writeHead(301, {
                    Location: "/",
                });
                ctx.res.end();
            }
        }
    }

    return {};
};

export default Register;
