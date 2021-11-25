import React from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import CategoryItem from "../components/CategoryItem";
import { actionType } from "../types";
import { appContext } from "../pages/_app";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        categoriesRoot: {
            display: "block",
            position: "relative",
            left: "25%",
            top: theme.spacing(7),
            transform: "translateY(0)",
            backgroundColor: "#ededed",
            zIndex: 1,

            [theme.breakpoints.up("md")]: {
                marginTop: "10vh",
            },

            "& .MuiTypography-body1": {
                fontSize: "1em",
            },
        },
        categoriesRootHidden: {
            display: "none",
            transform: "translateY(100%)",
            transition: "transform 300ms ease-in",

            [theme.breakpoints.up("md")]: {
                display: "block",
                marginTop: theme.spacing(10),
                transform: "translateY(0)",
                marginLeft: theme.spacing(3),
            },
        },
        catagories: {
            color: "#4f4f4f",
            textTransform: 'capitalize'
        },
    })
);

const CategoryMenu = ({ categories, open }) => {
    const classes = useStyles();

    const context = React.useContext(appContext);

    const filterByCategory = (e:any, category:any):void => {
        e.preventDefault()
        if((category === context.state.currentCategory)) {
            context.dispatch({
                type: actionType.CURRENT_CATEGORY,
                payload: undefined
            });
        }else {
            context.dispatch({
                type: actionType.CURRENT_CATEGORY,
                payload: category
            });
        }

    }

    const isCategorySet = category => {
        return (category === context.state.currentCategory)
    }

    return (
        <>
            <Grid
                item
                className={clsx(
                    classes.catagories,
                    open ? classes.categoriesRoot : classes.categoriesRootHidden
                )}
            >
                <ListItem button>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Kategorier" />
                </ListItem>

                {categories &&
                    categories.map((category) => (
                        <CategoryItem key={category.id} category={category} onFilter={filterByCategory}
                        clrChange={isCategorySet(category)} />
                    ))}
            </Grid>
        </>
    );
};

export default CategoryMenu;
