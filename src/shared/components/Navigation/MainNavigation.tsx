import { Link } from "react-router-dom";

import SideDrawer from "./SideDrawer";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import classes from "./MainNavigation.module.css";
import { useState } from "react";
import Backdrop from "../UI/Backdrop";

const MainNavigation: React.FC = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = (event: React.MouseEvent<HTMLElement>) => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = (event: React.MouseEvent<HTMLElement>) => {
        setDrawerIsOpen(false);
    };

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <div className={classes["main-navigation__drawer-nav"]}>
                    <NavLinks />
                </div>
            </SideDrawer>

            <MainHeader>
                <button
                    className={classes["main-navigation__menu-btn"]}
                    onClick={openDrawerHandler}
                >
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className={classes["main-navigation__title"]}>
                    <Link to="/">Your Places</Link>
                </h1>
                <nav className={classes["main-navigation__header-nav"]}>
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    );
};

export default MainNavigation;
