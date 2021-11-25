import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import { globalTheme } from "../styles/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AppContext } from "../context/appContext";
import { AppReducer } from "../reducers/reducer";
import "../styles/globals.css";
import Loader from "../components/Loader";
import { Router } from "next/router";
import { parseCookies } from "nookies";
import { Provider } from "next-auth/client";

/* strore Strapi Global object in context */
export const appContext = AppContext;

const MyApp = ({ Component, pageProps }) => {
    const context = React.useContext(appContext);
    const [state, dispatch] = React.useReducer(AppReducer, context);

    const AppContextProvider = ({ children }) => (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);

        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Nordic News Center</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <Provider session={pageProps.session}>
                <ThemeProvider theme={globalTheme}>
                    <AppContextProvider>
                        <CssBaseline />
                        {loading ? <Loader /> : <Component {...pageProps} />}
                    </AppContextProvider>
                </ThemeProvider>
            </Provider>
        </>
    );
};

export default MyApp;

MyApp.getInitialProps = (ctx) => {
    const parsedCookies = parseCookies(ctx).token;

    return {
        cookies: parsedCookies,
    };
};
