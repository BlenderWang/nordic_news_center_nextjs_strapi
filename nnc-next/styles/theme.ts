import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
    interface Palette {
        neutral: Palette["primary"];
    }
    interface PaletteOptions {
        neutral: PaletteOptions["primary"];
    }
}

export const globalTheme = createMuiTheme({
    palette: {
        primary: {
            light: "#64b5f6",
            main: "#1565c0",
            dark: "#0d47a1",
            contrastText: "#f2f2f2",
        },
        info: {
            light: "#56CCF2",
            main: "#2D9CDB",
            dark: "#2F80ED",
            contrastText: "#f2f2f2",
        },
        neutral: {
            light: "#bdbdbd",
            main: "#4f4f4f",
            dark: "#333333",
            contrastText: "#f1f1f1",
        },
    },
});
