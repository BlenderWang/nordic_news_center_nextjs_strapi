import React from "react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
    CssBaseline,
    Container,
    Chip,
    Card,
    CardContent,
    Grid,
    Typography,
    Box,
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import {
    amber,
    deepOrange,
    teal,
    blue,
    green,
    indigo,
} from "@material-ui/core/colors";
import { fetchAPI } from "../lib/api";
import Image from "../components/Image";
import Header from "../components/Header";
import CustomBreadcrumbs from "../components/CustomBreadcrumbs";
import CommentBox from "../components/CommentBox";
import ButtonGeneric from "../components/ButtonGeneric";
import Footer from "../components/Footer";
import { TPost } from "../types";
import { globalTheme } from "../styles/theme";
import axios from "axios";
import { useSession } from "next-auth/client";
import { appContext } from "./_app";
import { getAll, getBySlug } from "../lib/queries";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootContainer: {
            marginTop: theme.spacing(3),

            [theme.breakpoints.up("md")]: {
                marginTop: theme.spacing(9),
                position: "absolute",
                top: 0,
                right: 0,
                width: "75vw",
            },
        },
        cardsContainer: {
            flexDirection: "column",
        },
        categoryChip: {
            backgroundColor: (post: TPost) => {
                if (
                    post.category.name == "rapport" ||
                    post.category.name == "glada nyheter"
                ) {
                    return amber[400];
                }
                if (
                    post.category.name == "forskning" ||
                    post.category.name == "hälsa"
                ) {
                    return teal[400];
                }
                if (
                    post.category.name == "politik" ||
                    post.category.name == "opinion"
                ) {
                    return blue[500];
                }
                if (
                    post.category.name == "globalism" ||
                    post.category.name == "ekonomi"
                ) {
                    return green[800];
                }
                if (
                    post.category.name == "konflikt" ||
                    post.category.name == "redaktörs Val"
                ) {
                    return deepOrange[700];
                }
                return indigo[700];
            },
            width: "100%",
            marginTop: theme.spacing(2),
            color: '#f2f2f2',

            [theme.breakpoints.up("md")]: {
                width: "20%",
            },
        },
        markdown: {
            fontFamily: "Roboto",

            "& h5": {
                fontSize: "1em",
            },

            "& a": {
                color: globalTheme.palette.primary.main,
                display: "block",
            },

            "& blockquote": {
                fontStyle: "italic",
                fontSize: "1.25em",
                borderLeft: `2px solid ${amber[400]}`,
                padding: theme.spacing(1),
            },
            "& img": {
                width: "50%",
                position: "relative",
                left: "50%",
                transform: "translate(-50%, 0)",
            },
        },
        card: {
            maxWidth: "100%",
            background: "#f2f2f2",
            marginBottom: theme.spacing(2),

            [theme.breakpoints.up("md")]: {
                marginTop: theme.spacing(2),
            },
        },
        textClr: {
            color: "#333",
        },
        postTitle: {
            fontFamily: `Antonio`,
            fontSize: "1.25em",
            marginBottom: theme.spacing(2),

            [theme.breakpoints.up("md")]: {
                fontSize: "1.45em",
            },
        },
        commentHeader: {
            display: "flex",
            alignItems: "center",

            "& svg": {
                marginRight: theme.spacing(3),
                marginBottom: theme.spacing(1),
                color: theme.palette.neutral.main,
            },

            "& p:not(:last-child)": {
                marginRight: theme.spacing(5),
            },
        },
        publishedAt: {
            color: theme.palette.neutral.main,
        },
        commentContent: {
            marginLeft: theme.spacing(6),
        },
        comment: {
            marginBottom: theme.spacing(9),
        },
        content: {
            minHeight: "calc(20vh - 11rem)",

            [theme.breakpoints.up("md")]: {
                minHeight: "calc(22vh - 1rem)",
            },
        },
    })
);

export default function Post({ post, categories, affiliates, baseUrl }) {
    const classes = useStyles(post);

    const context = React.useContext(appContext);
    const [postComments, setPostComments] = React.useState([]);
    const [userComment, setUserComment] = React.useState("");

    const [session] = useSession();

    React.useEffect(() => {
        const getResult = async () => {
            const results = await axios.get(
                `${baseUrl}/comments?post=${post.id}`
            );
            setPostComments(results?.data);
        };

        getResult();
    }, []);

    const submitCommentHandler = React.useCallback(
        async (e) => {
            e.preventDefault();

            try {
                const res = await axios.post(`http://localhost:1337/comments`, {
                    content: userComment,
                    post: {
                        id: post.id,
                    },
                });

                console.log([...postComments, res.data]);

                setPostComments([...postComments, res.data]);
                setUserComment("");
            } catch (err) {
                console.error(err);
            }
        },
        [userComment]
    );

    return (
        <>
            <Header categories={categories} />

            <CustomBreadcrumbs homepage={"Home"} currentPage={post.title} />

            <div className={classes.content}>
                <Container maxWidth="lg" className={classes.rootContainer}>
                    <CssBaseline />

                    <Card elevation={1} className={classes.card}>
                        <CardContent className={classes.cardsContainer}>
                            <Typography
                                variant="h3"
                                component="h2"
                                className={clsx(classes.postTitle, classes.textClr)}
                            >
                                {post.title}
                            </Typography>
                            {post.image && (
                                <Image
                                    image={post.image}
                                    page={" "}
                                    avatar={false}
                                />
                            )}
                            <Chip
                                label={post?.category?.name?.toUpperCase()}
                                className={classes.categoryChip}
                            />
                            <h3>{post?.user?.username}</h3>
                            <Typography variant="body2">
                                {post.published_at.substring(0, 10)}
                            </Typography>
                            <ReactMarkdown
                                children={post.content}
                                skipHtml={false}
                                transformImageUri={(uri) => uri
                                    // uri.startsWith("http")
                                    //     ? uri
                                    //     : `http://localhost:1337${uri}`
                                }
                                className={classes.markdown}
                            />
                        </CardContent>
                    </Card>

                    <Grid
                        item
                        xs={12}
                        sm
                        container
                        className={classes.cardsContainer}
                    >
                        <Typography variant="subtitle2" gutterBottom>
                            {post.comments && post.comments.length > 1
                                ? `${post.comments.length} Comments`
                                : post.comments.length === 1
                                ? "1 Comment"
                                : "Comment"}
                        </Typography>

                        <form
                            noValidate
                            autoComplete="off"
                            onSubmit={submitCommentHandler}
                        >
                            <CommentBox
                                comment={userComment}
                                setComments={(e) => setUserComment(e.target.value)}
                            />

                            {session ? (
                                <ButtonGeneric btnText={"post"} authenticated />
                            ) : (
                                <ButtonGeneric btnText={"post"} authenticated={undefined} />
                            )}
                        </form>

                        {postComments && (
                            <div key={post.id} className={classes.comment}>
                                {postComments
                                    .slice(0)
                                    .reverse()
                                    .map((comment) => (
                                        <Box key={comment.id}>
                                            <div className={classes.commentHeader}>
                                                <AccountCircleRoundedIcon />

                                                {comment.user === null
                                                  ? <Typography
                                                  variant="body1"
                                                  gutterBottom
                                                  >
                                                    Anonymous
                                                  </Typography>
                                                  : <Typography
                                                  variant="body1"
                                                  gutterBottom
                                                  >
                                                    {comment?.user?.username}
                                                  </Typography>
                                                }

                                                <Typography
                                                    variant="body2"
                                                    gutterBottom
                                                    className={classes.publishedAt}
                                                >
                                                    {comment.published_at.substring(
                                                        0,
                                                        10
                                                    )}
                                                </Typography>
                                            </div>

                                            <Typography
                                                variant="body1"
                                                gutterBottom
                                                className={classes.commentContent}
                                            >
                                                {comment?.content}
                                            </Typography>
                                        </Box>
                                    ))}
                            </div>
                        )}
                    </Grid>
                </Container>
            </div>

            <Footer sites={affiliates} />
        </>
    );
}

// tell next.js how many pages there are
/* export async function getStaticPaths() {
    const posts = await getAll()
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }));

    return {
        paths,
        fallback: false,
    };
} */

// for each individual page: get the data for that page
export async function getServerSideProps({ params }) {
  const post = await getBySlug(params)
  const categories = await fetchAPI("categories");
  const affiliates = await fetchAPI("affiliates");
  const baseUrl = process.env.STRAPI_API || "";

    return {
      props: { post, categories, affiliates, baseUrl },
        // revalidate: 1,
    };
}
