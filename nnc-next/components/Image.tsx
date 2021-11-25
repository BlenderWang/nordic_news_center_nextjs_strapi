import { getStrapiMedia } from "../lib/media";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        img: {
            height: "20vh",
        },
        imgSlug: {
            height: "50vh",
        },
        avatar: {
            height: theme.spacing(3),
            width: "2em",
            transform: "translateX(60%)",

            [theme.breakpoints.up("md")]: {
                width: "2.3vw",
            },

            [theme.breakpoints.up("lg")]: {
                width: "2em",
            },
        },
    })
);

const Image = ({
    image,
    page,
    avatar,
}: {
    image: {
        alternativeText?: string;
        name: string;
    };
    page?: string;
    avatar?: boolean;
}) => {
    const classes = useStyles();
    const imageUrl = getStrapiMedia(image);

    return (
        <CardMedia
            image={imageUrl}
            title={image.alternativeText || image.name}
            className={
                page === "index"
                    ? classes.img
                    : avatar
                    ? classes.avatar
                    : classes.imgSlug
            }
        />
    );
};

export default Image;
