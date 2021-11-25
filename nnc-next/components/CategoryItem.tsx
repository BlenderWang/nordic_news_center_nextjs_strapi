import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemProps, ListItemText } from "@material-ui/core";
import Image from "./Image";
import { TCategory } from "../types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            maxWidth: 300,

            [theme.breakpoints.up("md")]: {
                maxWidth: 245,
            },

            [theme.breakpoints.up("lg")]: {
                maxWidth: 350,
            },

            "& .MuiListItemAvatar-root": {
                paddingLeft: theme.spacing(2),
            },
        },
        activeItem: {
            backgroundColor: '#1565c0 !important',
            color: '#f1f1f1',
        }
    })
);

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

const CategoryItem = ({ category, onFilter, clrChange }: TCategory) => {
    const classes = useStyles();

    return (
        <List className={classes.root} key={category.id}>
            <ListItemLink href='#' onClick={event =>
                onFilter(event, category)
            } className={clrChange ? classes.activeItem : null}
                >
                {category.avatar && (
                    <>
                        <Image image={category.avatar} avatar />
                    </>
                )}
                <ListItemText primary={category.name} inset />
            </ListItemLink>
        </List>
    );
};

export default CategoryItem;
