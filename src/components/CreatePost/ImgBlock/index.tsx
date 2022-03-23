import React from 'react';
import UploadFileIcon from "@mui/icons-material/UploadFile";

import styles from "./ImgBlock.module.scss";
import GreenButton from "../../UiComponents/GreenButton";
import {calcWidth} from "../../../utils/functional";

type ImgBlockProps = {
    imgFile: File | undefined;
    setImgFile: (file: File) => void;
    uploadImgFile: () => void;
    widthDiv: number;
}

const ImgBlock: React.FC<ImgBlockProps> = ({imgFile, setImgFile, uploadImgFile, widthDiv}) => {

    const handleImgChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList) return;
        setImgFile(fileList[0]);
    }
    return (
        <div className={styles.wrapper}>
            <span className={styles.span}>Ссылка на изображение:</span>
            <div className={styles.form}>
                <div className={styles.input}>
                    <input readOnly={true} type="text" value={imgFile ? URL.createObjectURL(imgFile) : ""}
                           onChange={handleImgChange}/>
                </div>
                <label htmlFor="img">
                    <input
                        type="file"
                        accept="image/*"
                        style={{display: "none"}}
                        id="img"
                        name="img"
                        multiple={false}
                        onChange={handleImgChange}
                    />
                    <GreenButton click={uploadImgFile} widthButton={"145px"} heightButton={"100%"}
                                 nameButton={"Загрузить"} icon={<UploadFileIcon/>}/>
                </label>
            </div>
            {(imgFile && imgFile.type.match(/image\/*/)) && (
                <div className={styles.img}>
                    <img style={{width: calcWidth(widthDiv), height: calcWidth(widthDiv)}}
                         src={URL.createObjectURL(imgFile)} alt={imgFile.name}/>
                </div>
            )}
        </div>
    );
};

export default ImgBlock;