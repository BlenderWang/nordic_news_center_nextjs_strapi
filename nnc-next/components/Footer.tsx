import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footerRoot: {
            height: "10rem",

            [theme.breakpoints.up("md")]: {
                marginTop: theme.spacing(8),
            },
        },
        container: {
            margin: "auto",
            padding: "2rem 10vw",

            [theme.breakpoints.up("lg")]: {
                padding: "4rem 0",
            },

            "& .MuiGrid-container": {
                [theme.breakpoints.up("lg")]: {
                    display: "grid",
                    gridTemplateAreas: `"subscribe links"
                    'copyright copyright'`,
                },
            },
        },
        subscribe: {
            display: "grid",
            gap: "10px",

            [theme.breakpoints.up("lg")]: {
                gridArea: "subscribe",
                minWidth: "100%",
            },

            "& h4": {
                [theme.breakpoints.up("lg")]: {
                    fontSize: theme.spacing(3),
                },
            },

            "& form": {
                display: "grid",
                gap: "8px",

                [theme.breakpoints.up("lg")]: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    "& button": {
                        height: "3.6rem",
                    },
                },
            },
        },
        externalLinks: {
            justifyContent: "center",
            alignItems: "center",

            [theme.breakpoints.up("lg")]: {
                gridArea: "links",
            },

            "& div": {
                maxWidth: "initial",

                [theme.breakpoints.up("lg")]: {
                    display: "flex",
                    gap: theme.spacing(2),
                },
            },
        },
        copyright: {
            [theme.breakpoints.up("lg")]: {
                gridArea: "copyright",
                marginTop: theme.spacing(5),
            },
        },
    })
);

const Footer = ({ sites }) => {
    const classes = useStyles();

    return (
        <footer className={classes.footerRoot}>
            <Divider />

            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* subscribe to newsletter */}
                    <Grid item xs={12} lg={6} className={classes.subscribe}>
                        <Typography
                            component="h4"
                            variant="body1"
                            gutterBottom
                            align="center"
                        >
                            Would you like to subscribe to our newsletter?
                        </Typography>

                        <form>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                            />
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                /* className={clsx(
                                    classes.actionBtn,
                                    classes.loginBtn
                                )} */
                            >
                                Subscribe
                            </Button>
                        </form>
                    </Grid>

                    {/* links to affiliate sites */}
                    <Grid container className={classes.externalLinks}>
                        <Grid item xs={3} lg={2}>
                            {sites.length > 0 && sites.map(site => (
                                <List
                                    key={site.id}
                                    subheader={
                                        <ListSubheader>
                                            {site.name}
                                        </ListSubheader>
                                    }
                                >
                                    <ListItemText inset>
                                        <Link href={site.url}>
                                            Go To Site
                                        </Link>
                                    </ListItemText>
                                 </List>
                            ))}
                        </Grid>
                    </Grid>

                    <Grid item xs={12} className={classes.copyright}>
                        <Typography
                            variant="body2"
                            align="center"
                            color="textSecondary"
                        >
                            Copyright &copy; {new Date().getFullYear()}
                            {} Nordic News Center
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
};

export default Footer;
