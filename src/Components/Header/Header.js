import React from "react";
import classes from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Header() {
  return (
    <div className={classes.header_outer_container}>
      <div className={classes.header_container}>
        <div className={classes.header_left}>
          <img className={classes.logo} src={logo || "Netflix"} alt="" />

          <ul>
            <li className={classes.link}>Home</li>
            <li className={classes.link}>TVShows</li>
            <li className={classes.link}>Movies</li>
            <li className={classes.link}>Latest</li>
            <li className={classes.link}>MyList</li>
            <li className={classes.link}>Browse by Languages</li>
          </ul>
        </div>
        <div className={classes.header_right}>
          <ul>
            <li>
              <SearchIcon />{" "}
            </li>
            <li>
              <NotificationsNoneIcon />{" "}
            </li>
            <li>
              <AccountBoxIcon />{" "}
            </li>
            <li>
              <ArrowDropDownIcon />{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
