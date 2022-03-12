import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import styles from "../LogIn/LogIn.module.scss";
import YellowButton from "../../UiComponents/YellowButton";

type AuthorizationProps = {
    onClose: () => void;
}

interface FormInput {
    name: string;
    email: string;
    password: string;
}

const schema = yup.object().shape({
    name: yup.string().min(2, 'Слишком короткое имя!'),
    email: yup.string().email('Неверная почта!').required('Укажите почту!'),
    password: yup.string().when('email', {
        is: (value: string) => value.includes('@'),
        then: yup.string().required('Введите пароль!').min(4, 'Пароль должен состоять минимум из 4-х символов!')
    }),
});

const Authorization: React.FC<AuthorizationProps> = ({onClose}) => {
    const [passwordVisibility, setPasswordVisibility] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<FormInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormInput) => {
        alert(JSON.stringify(data));
    };
    const togglePassword = () => {
        setPasswordVisibility(!passwordVisibility)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p>Регистрация</p>
                <i onClick={onClose}><CloseIcon style={{color: "#373737", cursor: "pointer"}}/></i></div>
            <div className={styles.name}>
                <label>Имя и фамилия</label>
                <input {...register('name')}/>
                {errors?.name && <p>{errors.name.message}</p>}</div>
            <div className={styles.email}>
                <label>Email</label>
                <input {...register('email')}/>
                {errors?.email && <p>{errors.email.message}</p>}</div>
            <div className={styles.password}>
                <label>Пароль</label>
                <input {...register('password')}
                       type={!passwordVisibility ? "password" : "text"}/>
                <i onClick={togglePassword}>{passwordVisibility ? <VisibilityIcon/> : <VisibilityOffIcon/>}</i>
                {errors?.password && <p>{errors.password.message}</p>}</div>
            <div onClick={handleSubmit(onSubmit)} className={`${styles.button} ${styles.buttonAuth}`}>
                <YellowButton widthButton={"100%"}
                              heightButton={"49px"}
                              nameButton={"Зарегистрироваться"}/></div>
        </div>
    );
};

export default Authorization;