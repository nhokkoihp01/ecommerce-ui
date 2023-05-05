import React from "react";
import { animateScroll as scroll } from "react-scroll";
import classNames from "classnames/bind";

import { useScrollY } from "~/components/Hooks/useScrollY";
import styles from "./BackTop.module.scss";
import { RiArrowUpSLine } from "react-icons/ri";

const cx = classNames.bind(styles);

function BackTop(props) {
  const ScrollToTop = () => {
    scroll.scrollToTop();
  };
  const [scrollY] = useScrollY();
  return (
    <div
      className={cx("wrapper")}
      style={{ visibility: `${scrollY > 600 ? "visible" : "hidden"}` }}
      onClick={() => ScrollToTop()}
    >
      <span>
        <RiArrowUpSLine className={cx("go__top-icon")} />
      </span>
    </div>
  );
}

export default BackTop;
