import { fetchAPI } from "../lib/api";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Grid, Typography } from "@material-ui/core";
import Masonry from "react-masonry-css";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import React from "react";
import Footer from "../components/Footer";
import { appContext } from "./_app";
import { getPostsByCategory } from "../lib/queries";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textClr: {
            color: "#4f4f4f",
        },
        content: {
            minHeight: "calc(20vh - 11rem)",

            [theme.breakpoints.up("md")]: {
                minHeight: "calc(22vh - 1rem)",
            },
        },
        rootContainer: {
            marginTop: theme.spacing(9),

            "& .MuiGrid-spacing-xs-2": {
                width: "calc(100% - 24px)",
                margin: "16px",
            },

            [theme.breakpoints.up("md")]: {
                position: "absolute",
                top: theme.spacing(2),
                right: 0,
                width: "75vw",

                "& .MuiGrid-spacing-xs-2": {
                    width: "calc(100% + 16px)",
                    margin: " -8px",
                },
            },

            [theme.breakpoints.up("lg")]: {
                maxWidth: "initial",
            },
        },
        cardsContainer: {
            flexDirection: "column",
        },
        cardsGroup: {
            display: "flex",
            gap: "15px",
        },
        cardsGroup_column: {
            backgroundClip: "padding-box",

            "& > div": {
                marginBottom: theme.spacing(3),
            },
        },
        latest: {
            fontSize: "1rem",

            [theme.breakpoints.up("md")]: {
                fontSize: "1.25rem",
            },
        },
    })
);

const breakpoints = {
    default: 4,
    1280: 3,
    960: 2,
    600: 1,
};

export default function Home({ posts, categories, affiliates }) {
    const classes = useStyles();

    const context = React.useContext(appContext);
    const selectedCategory = context.state.currentCategory;
    const [postList, setPostList] = React.useState(posts);

    React.useEffect(() => {
        async function fetchPosts() {
            if (selectedCategory) {
                let { id } = selectedCategory;
                if (id) {
                    const filterdPosts = await getPostsByCategory({ id });
                    setPostList(filterdPosts);
                }
            }
        }
        fetchPosts();
    }, [selectedCategory]);

    return (
        <>
            <Header categories={categories} />

            <div className={classes.content}>
                <Container maxWidth="lg" className={classes.rootContainer}>
                    <CssBaseline />

                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            sm
                            container
                            className={classes.cardsContainer}
                        >
                            <Typography
                                variant="h6"
                                component="h3"
                                gutterBottom
                                className={clsx(
                                    classes.textClr,
                                    classes.latest
                                )}
                            >
                                Senaste nyheter
                            </Typography>

                            <Masonry
                                breakpointCols={breakpoints}
                                className={classes.cardsGroup}
                                columnClassName={classes.cardsGroup_column}
                            >
                                {postList &&
                                    postList.map((post) => (
                                        <div key={post.id}>
                                            <NewsCard post={post} />
                                        </div>
                                    ))}
                            </Masonry>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <Footer sites={affiliates} />
        </>
    );
}

export async function getStaticProps({ params }) {
    const [posts, categories, affiliates] = await Promise.all([
        fetchAPI("posts"),
        fetchAPI("categories"),
        fetchAPI("affiliates"),
    ]);

    return {
        props: { posts, categories, affiliates },
        revalidate: 1,
    };
}
