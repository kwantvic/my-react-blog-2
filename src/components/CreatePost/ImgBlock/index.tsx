import React from 'react';
import UploadFileIcon from "@mui/icons-material/UploadFile";

import styles from "./ImgBlock.module.scss";
import {calcWidth} from "../../../utils/functional";
import GreenButton from "../../UiComponents/GreenButton";

interface ImgBlockProps {
    title: string;
    imgUrl: string;
    handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    widthDiv: number;
}

export const ImgBlock: React.FC<ImgBlockProps> = React.memo(({imgUrl, title, handleImgChange, widthDiv}) => {

    return (
        <div className={styles.wrapper}>
            <span className={styles.span}>Ссылка на изображение:</span>
            <div className={styles.form}>
                <div className={styles.input}>
                    <input readOnly={true} type="text" value={imgUrl}/>
                </div>
                <label htmlFor="imgFile">
                    <input
                        type="file" accept="image/*" id="imgFile" name="imgFile" multiple={false}
                        style={{display: "none"}}
                        onChange={handleImgChange}
                    />
                    {/*todo: fix double-click*/}
                    <GreenButton widthButton={"145px"}
                                 heightButton={"100%"}
                                 nameButton={"Загрузить"}
                                 icon={<UploadFileIcon/>}/>
                </label>
            </div>
            {imgUrl && (
                <div className={styles.img}>
                    <img style={{width: calcWidth(widthDiv), height: calcWidth(widthDiv)}}
                         src={imgUrl} alt={title}/>
                </div>
            )}
        </div>
    );
});