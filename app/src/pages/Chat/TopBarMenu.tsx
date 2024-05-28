import { Menu } from "@mui/icons-material";
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import React, { useRef, useState } from "react";

export function TopBarMenu() {
    const menuRef = useRef<HTMLButtonElement>(null);
    const [ openMenu, setOpenMenu ] = useState<boolean>(false);

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
        } else if (event.key === 'Escape') {
            setOpenMenu(false);
        }
    }

    const seeProfile = () => {
        setOpenMenu(false);
    }

    const report = () => {
        setOpenMenu(false);
    }

    return (
        <React.Fragment>
            <IconButton
                ref={menuRef}
                onClick={() => setOpenMenu((openMenu) => !openMenu)}>
                <Menu />
            </IconButton>
            <Popper
                open={openMenu}
                anchorEl={menuRef.current}
                placement="bottom-end"
                transition
                disablePortal
                sx={{
                    bgcolor: "bg",
                    zIndex: 1000
                }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
                        }}>
                        <Paper>
                            <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                                <MenuList
                                    autoFocusItem={openMenu}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={seeProfile}>
                                        See Profile
                                    </MenuItem>
                                    <MenuItem onClick={report}>
                                        Report
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    )
}