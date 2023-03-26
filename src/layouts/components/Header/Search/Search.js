import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import {Link, useNavigate} from "react-router-dom";
import {Avatar} from "@material-ui/core";

import styles from "./Search.module.scss";
import Product from '~/assets/product/product01.jpg'
import {getProductBySearchAndMaxResult} from "~/services/workspaces.sevices";
import useDebounce from "~/components/Hooks/useDebounce";


const cx = classNames.bind(styles);

function Search(props) {
    const [searchValue, setSearchValue] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleClick = () => {
        if (searchValue.length > 0) {
            navigate(`/product-category/search/${searchValue}`);
            setShowResult(false)
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            setShowResult(false);
            navigate(`/product-category/search/${searchValue}`);
        }
    };
    const debouncedValue = useDebounce(searchValue, 700);
    useEffect(() => {
        const maxResult = 5;
        getProductBySearchAndMaxResult(debouncedValue, maxResult).then((res) => setProducts(res.data))
    }, [debouncedValue])
    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive
                onClickOutside={handleHideResult}
                placement="bottom-start"
                maxWidth={600}
                visible={showResult && searchValue.length > 0}
                render={attrs => (
                    <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                        {products?.length > 0 ? (
                            products?.map((item, index) => {
                                return (
                                    <Link
                                        key={item.id}
                                        to={`/product-detail/${item.id}/product`}
                                        className={cx("result-item")}
                                        onClick={() => setShowResult(false)}
                                    >
                                        <Avatar
                                            variant="square"
                                            sx={{ width: 24, height: 24 }}
                                            alt="Avatar"
                                            src={item.image}
                                        />
                                        <h3 className={cx("product-name")}>{item.name}</h3>
                                    </Link>
                                );
                            })
                        ) : (
                            <p className={cx("empty")}>Không tìm thấy sản phẩm</p>
                        )}
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input className={cx('search-input')}
                           onChange={handleChange}
                           spellCheck={false}
                           value={searchValue}
                           onFocus={() => setShowResult(true)}
                           onKeyPress={handleKeyPress}
                           placeholder="Bạn tìm gì hôm nay"/>
                    <button
                        onClick={handleClick}
                        className={cx('btn-search', 'input-separate')}>Tìm kiếm
                    </button>
                </div>
            </Tippy>

        </div>
    );
}

export default Search;
