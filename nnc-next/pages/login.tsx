import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
import SimpleAlert from "../components/SimpleAlert";
import { getCsrfToken, signIn, getSession } from "next-auth/client";

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

const Login = ({ csrfToken }) => {
    const classes = useStyles();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const router = useRouter();

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
            setError(true);
        }

        const res = await signIn('credentials', {
            email,
            password,
            callbackUrl: `${window.location.origin}/`,
            redirect: false
        })

        if(res?.error) {
            setError(true);
        }
        if(res.url) {
            getSession();
            router.push(res.url);
        }
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
                            Inloggning
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
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <TextField
                                required
                                label="E-post"
                                type="email"
                                name="email"
                                placeholder="john@email.com"
                                fullWidth
                                autoComplete="on"
                                variant="outlined"
                                error={error}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error && (
                                <SimpleAlert
                                    message={
                                        "Make sure your email address is correct!"
                                    }
                                />
                            )}
                            <TextField
                                required
                                label="Lösenord"
                                type="password"
                                name="password"
                                placeholder="Lösenord"
                                autoComplete="on"
                                fullWidth
                                variant="outlined"
                                error={error}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && (
                                <SimpleAlert
                                    message={
                                        "Make sure your password is correct!"
                                    }
                                />
                            )}
                            <Button
                                type="submit"
                                variant="outlined"
                                className={clsx(
                                    classes.actionBtn,
                                    classes.loginBtn
                                )}
                            >
                                Logga In
                            </Button>
                        </form>

                        <Typography>
                            Skapa ett konto{" "}
                            <Link href="/register">
                                <a className={classes.linkColor}>här</a>
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

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context);
    return {
        props: {
            csrfToken
        }
    }
}

export default Login;
