import React from 'react';
import {useForm, Controller} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";

import styles from "./CreatePost.module.scss";
import YellowButton from "../UiComponents/YellowButton";
import {useContainerDimensions} from "../../utils/hooks";
import {WYSIWYGEditor} from "./WYSIWYGEditor";
import {getNameValues} from "../../utils/functional";
import {ImgBlock} from "./ImgBlock";
import {addPostThunk, uploadImgFileThunk} from "../../redux/actions/posts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";
import {createPostNameValues} from "../../utils/variables";

interface FormInput {
    title: string;
    description: string;
    editorContent: string;
}

const schema = yup.object().shape({
    title: yup.string().required('Введите заголовок!').min(3, 'Введите минимум три символа!'),
    description: yup.string().required('Опишите коротко ваш пост'),
    editorContent: yup.string().required('Введите текс поста!').min(9, 'Введите текс поста!')
})

export const CreatePost: React.FC = () => {
    console.log("🏠CreatePost");
    const posts = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch();
    const [imgFileSelected, setImgFileSelected] = React.useState<File>();
    const [values, setValues] = React.useState({
        title: "",
        description: "",
        imgUrl: "",
        text: ""
    });
    const dimensionsCreatePostRef = React.useRef<HTMLHeadingElement>(null);
    const {widthDiv} = useContainerDimensions(dimensionsCreatePostRef);
    const {handleSubmit, control, register, formState: {errors}, reset} = useForm<FormInput>({
        mode: "onChange",
        resolver: yupResolver(schema)
    });
    React.useEffect(() => {
        createPostNameValues.forEach((name) => {
            if (getNameValues(`values-${name}`) !== null) {
                setValues((prev) => {
                    return {
                        ...prev,
                        [name]: getNameValues(`values-${name}`)
                    }
                })
            }
        })
    },[]);
    React.useEffect(() => {
        if (imgFileSelected) {
            const formData = new FormData();
            formData.append("file", imgFileSelected);
            dispatch(uploadImgFileThunk(formData));
        }
    }, [imgFileSelected, dispatch]);
    React.useEffect(() => {
        if (posts.urlImgEditPost) {
            setValues(prev => {
                return {
                    ...prev,
                    imgUrl: posts.urlImgEditPost
                }
            });
        }
    }, [posts.urlImgEditPost]);

    function toSetValues(nameValue: string) {
        setValues(prev => {
            return {
                ...prev,
                [nameValue]: getNameValues(`values-${nameValue}`)
            }
        })
    }
    function onChangeValues(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        setValues(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        });
        localStorage.setItem(`values-${e.target.name}`, `${e.target.value}`);
    }
    const handleImgChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const fileList = e.target.files;
            setImgFileSelected(fileList[0]);
            setValues(prev => {
                return {
                    ...prev,
                    imgUrl: 'http://localhost:5656/uploads/' + (fileList[0].name)
                }
            })
        }
    }
    const onSubmit = (data: FormInput) => {
        dispatch(addPostThunk({
            title: data.title,
            description: data.description,
            imgUrl: values.imgUrl,
            text: data.editorContent
        }));
        onReset();
    }
    const onReset = () => {
        for (let key in values) {
            setValues(prev => {
                return {
                    ...prev,
                    [key]: ""
                }
            })
        }
        reset();
    }

    return (
        <div className={styles.wrapper} ref={dimensionsCreatePostRef}>
            <div className={styles.title}>
                {values.title.length < 3 && errors?.title &&
                    <p style={{marginTop: -22}} className="yupErrors">{errors.title.message}</p>}
                <input {...register('title')}
                       value={values.title}
                       onChange={onChangeValues} type="text" placeholder="Введите заголовок..."/>
            </div>
            <div className={styles.description}>
                {!values.description && errors?.description &&
                    <p style={{left: 200}} className="yupErrors">{errors.description.message}</p>}
                <span className={styles.span}>Краткое описание</span>
                <textarea {...register('description')}
                          onChange={onChangeValues}
                          value={(getNameValues("values-description") !== null) ? (getNameValues("values-description")!) : values.description}/>
            </div>
            <ImgBlock imgUrl={values.imgUrl}
                      title={values.title}
                      handleImgChange={handleImgChange}
                      widthDiv={widthDiv}/>
            <div className={styles.text}>
                <span className={styles.span}>Полное описание</span>
                {/*todo: Warning: Can't call setState on a component that is not yet mounted.*/}
                <Controller render={({field: {value, onChange}}) => <WYSIWYGEditor value={value}
                                                                                   toChange={onChange}
                                                                                   toSetValues={toSetValues}/>}
                            name="editorContent"
                            control={control}/>
                {errors?.editorContent &&
                    <p style={{left: 200}} className="yupErrors">{errors.editorContent.message}</p>}
            </div>
            <div className={styles.buttons}>
                <YellowButton widthButton={"160px"} heightButton={"45px"} nameButton={"Отмена"}/>
                <YellowButton onClick={handleSubmit(onSubmit)} widthButton={"160px"} heightButton={"45px"}
                              nameButton={"Опубликовать"}/>
            </div>
        </div>
    );
};