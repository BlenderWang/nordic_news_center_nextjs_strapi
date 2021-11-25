import Link from "next/link";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Avatar,
    IconButton,
    Typography,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
    amber,
    deepOrange,
    teal,
    cyan,
    blue,
    brown,
    green,
    indigo,
    deepPurple,
    red,
} from "@material-ui/core/colors";
import Image from "../components/Image";
import { TPost } from "../types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            maxWidth: "100%",
            background: "#f2f2f2",
        },
        cardHead: {
            justifyContent: "space-between",

            "& .MuiCardHeader-content": {
                flex: "initial",
            },
        },
        avatar: {
            backgroundColor: (post: TPost) => {
                if (post.category) {
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
                        post.category.name == "redaktörs val"
                    ) {
                        return deepOrange[700];
                    }
                }
                return indigo[700];
            },
        },
        cardActions: {
            justifyContent: "space-between",

            "& .MuiTypography-root": {
                marginLeft: theme.spacing(1),
                color: "#828282",
            },
        },
        textClr: {
            color: "#333",
        },
        postTitle: {
            fontFamily: `Antonio`,
            fontSize: "1.25em",
            marginTop: theme.spacing(2),

            [theme.breakpoints.up("md")]: {
                fontSize: "1.45em",
            },
        },
    })
);

const handleMoreHorizIconClick = () => {
    console.log("more options");
};

const NewsCard = ({ post }) => {
    const classes = useStyles(post);

    return (
        <div>
            <Card elevation={1} className={classes.card}>
                {post.category && (
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label={post?.category?.name}
                                className={classes.avatar}
                            >
                                {post.category.name
                                    .substring(0, 1)
                                    .toUpperCase()}
                            </Avatar>
                        }
                        title={post?.user?.username}
                        className={clsx(classes.cardHead, classes.textClr)}
                    />
                )}

                <CardContent>
                    {post.image && (
                        <Link href={`/${post.slug}`}>
                            <a>
                                <Image
                                    image={post.image}
                                    page={"index"}
                                    avatar={false}
                                />
                            </a>
                        </Link>
                    )}

                    <Link href={`/${post.slug}`}>
                        <a>
                            <Typography
                                variant="h3"
                                component="h2"
                                className={clsx(
                                    classes.postTitle,
                                    classes.textClr
                                )}
                            >
                                {post.title}
                            </Typography>
                        </a>
                    </Link>
                </CardContent>

                <CardActions className={classes.cardActions}>
                    <Typography variant="body2">
                        {post.published_at.substring(0, 10)}
                    </Typography>
                    <IconButton
                        aria-label="more options"
                        onClick={handleMoreHorizIconClick}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
};

export default NewsCard;
