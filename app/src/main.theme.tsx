import { createTheme } from "@mui/material";

const spacing = 16;
const BottomNavigationHeight = 64;

declare module "@mui/material/styles" {
    interface Palette {
        bg: string
    }
    interface PaletteOptions {
        bg: string
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        bg: true
    }
}

const bodyBackground = "#f5f5f5";
const background = "#fafafa";

export const MainTheme = createTheme({
    spacing,
    palette: {
        bg: background
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
                color: "transparent"
            },
            styleOverrides: {
                root: {
                    padding: spacing
                }
            }
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    position: "fixed",
                    bottom: spacing,
                    right: spacing
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    cursor: "pointer"
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: "none"
                }
            }
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    height: BottomNavigationHeight
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                "body": {
                    background: bodyBackground
                },
                ".page-root": {
                    background: background,
                    minHeight: "100dvh"
                },
                ".page-root > :last-child": {
                    marginBottom: BottomNavigationHeight + spacing
                },
                ".page-last-child": {
                    marginBottom: `${BottomNavigationHeight + spacing}px!important`
                }
            }
        }
    }
})