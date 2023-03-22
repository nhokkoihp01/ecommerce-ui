import React from "react";
import classNames from "classnames/bind";

import {Link} from "react-router-dom";
import Slider from "react-slick";

import styles from "./CategoryItem.module.scss";


const cx = classNames.bind(styles);

function CategoryItem(props) {
    const {categories} = props;
    console.log(categories);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        initialSlide: 0,
        slidesToShow: 10,
        slidesToScroll: 4,
        rows: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div>
            <Slider {...settings}>
                {
                    categories.map((item,index)=>{
                        return (
                            <Link
                                key={item.id}
                                to={``}
                                className={cx("category-item")}>
                                <div className={cx("box-image")}>
                                    <img className={cx("image")} alt={item.name} src={item.image}></img>
                                </div>
                                <h3 className={cx("category-name")}>{item.name}</h3>
                            </Link>
                        )
                    })
                }

            </Slider>
        </div>
    );
}

export default CategoryItem;
