import React, { useState } from "react";
import classNames from "classnames/bind";
import { Popover, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";


import styles from "./UserDropdown.module.scss";
import avatar from "~/assets/avatar/avatar.jpg";
import config from "~/config";

const cx = classNames.bind(styles);

function UserDropdown(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("user-info")} onMouseEnter={handlePopoverOpen}>
        <img className={cx("avatar")} src={avatar} alt=""></img>
        <span className={cx("username")}>TriTeoTriTeoTriTeo</span>
      </div>
      <Popover
        open={open}
        onMouseLeave={handlePopoverClose}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
              borderRadius: 0,
            },
          }}
      >
        <Box
          sx={{
            position: "relative",
            mt: "10px",
            "&::before": {
              backgroundColor: "white",
              content: '""',
              display: "block",
              position: "absolute",
              width: 12,
              height: 12,
              top: -6,
              transform: "rotate(45deg)",
              right: `calc(20% - 6px)`,
            },
          }}
        />
        <Typography>
          <div className={cx("dropdown-user")}>
            <Link to={"/"} className={cx("dropdowm-item")}>
              Tài khoản của tôi
            </Link>
            <Link to={'/'} className={cx("dropdowm-item")}>
              Đơn mua
            </Link>
            <Link to={'/'} className={cx("dropdowm-item")}>
              Đăng xuất
            </Link>
          </div>
        </Typography>
      </Popover>
    
    </div>
  );
}

export default UserDropdown;
