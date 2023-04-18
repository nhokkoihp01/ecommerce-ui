import React from "react";
import ImageUploading from "react-images-uploading";
import classNames from "classnames/bind";


import styles from "./UpLoadFileImage.module.scss";

const cx = classNames.bind(styles);

function UpLoadFileImage(props) {
    const {images, onChange, maxNumber, open, imageProduct, name, showButton, handleImageUpload} = props;


    return (
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg", "gif", "png"]}
        >
            {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
              }) => (
                // write your building UI
                <div className={cx("upload__image-wrapper")}>
                    {showButton && (
                        <button
                            className={cx("btn-upload")}
                            style={isDragging ? {color: "red"} : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Chọn ảnh
                        </button>
                    )}

                    {imageList.length > 0 &&
                    imageList.map((image, index) => (
                        <div key={index} className={cx("image-item")}>
                            <img
                                src={image.data_url}
                                className={cx("image-product")}
                                alt={name}
                            />
                            <div className={cx("image-item__btn-wrapper")}>
                                <button
                                    className={cx("btn-update")}
                                    onClick={() => onImageUpdate(index)}
                                >
                                    Chọn Ảnh
                                </button>
                                {/*<button*/}
                                {/*    className={cx('btn-delete')}*/}
                                {/*    onClick={() => onImageRemove(index)}>Remove*/}
                                {/*</button>*/}
                            </div>
                        </div>
                    ))}
                    {open && (
                        <div className={cx("image-item")}>
                            <img
                                src={imageProduct}
                                className={cx("image-product")}
                                alt={name}
                            />
                        </div>
                    )}
                </div>
            )}
        </ImageUploading>
    );
}

export default UpLoadFileImage;
