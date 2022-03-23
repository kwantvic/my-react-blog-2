import React from 'react';
import {useForm, Controller} from "react-hook-form";

import styles from "./CreatePost.module.scss";
import YellowButton from "../UiComponents/YellowButton";
import ImgBlock from "./ImgBlock";
import {useContainerDimensions} from "../../utils/hooks";
import WYSIWYGEditor from "./WYSIWYGEditor";
import {useDispatch} from "react-redux";
import {getNameValues} from "../../utils/functional";

const CreatePost: React.FC = () => {
    const [imgFileSelected, setImgFileSelected] = React.useState<File>();
    const [values, setValues] = React.useState({
        title: "",
        description: "",
        imgUrl: ""
    });
    const dispatch = useDispatch();
    const dimensionsCreatePostRef = React.useRef<HTMLHeadingElement>(null);
    const {handleSubmit, control} = useForm({
        mode: "onChange"
    });

    const {widthDiv} = useContainerDimensions(dimensionsCreatePostRef);

    const uploadImgFile = function () {
        if (imgFileSelected) {
            const formData = new FormData();
            formData.append("image", imgFileSelected, imgFileSelected.name);
        }
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        setValues(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        });
        localStorage.setItem(`values-${e.target.name}`, e.target.value);
    }

    return (
        <div className={styles.wrapper} ref={dimensionsCreatePostRef}>
            <div className={styles.title}>
                <input name="title"
                       value={(getNameValues("values-title") !== null) ? (getNameValues("values-title")!) : values.title}
                       onChange={onChange} type="text" placeholder="Введите заголовок..."/>
            </div>
            <div className={styles.description}>
                <span className={styles.span}>Краткое описание</span>
                <textarea name="description" onChange={onChange}
                          value={(getNameValues("values-description") !== null) ? (getNameValues("values-description")!) : values.description}/>
            </div>
            <ImgBlock imgFile={imgFileSelected} setImgFile={setImgFileSelected} uploadImgFile={uploadImgFile}
                      widthDiv={widthDiv}/>
            <div className={styles.text}>
                <span className={styles.span}>Полное описание</span>
                {/*todo: Warning: Can't call setState on a component that is not yet mounted.*/}
                <Controller
                    render={({field: {value, onChange}}) => <WYSIWYGEditor value={value} toChange={onChange}/>}
                    name="editor_content"
                    control={control}
                />
                <button type="submit">submit</button>
            </div>
            <div className={styles.buttons}>
                <YellowButton widthButton={"160px"} heightButton={"45px"} nameButton={"Отмена"}/>
                <YellowButton widthButton={"160px"} heightButton={"45px"} nameButton={"Опубликовать"}/>
            </div>
        </div>
    );
};

export default CreatePost;