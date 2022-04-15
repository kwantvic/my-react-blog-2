import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import styles from "../LogIn/LogIn.module.scss";
import YellowButton from "../../UiComponents/YellowButton";
import {useDispatch} from "react-redux";
import {registrationThunk} from "../../../redux/actions/auth";

type RegistrationProps = {
    onClose: () => void;
}
interface FormInput {
    fullName: string;
    email: string;
    password: string;
}

const schema = yup.object().shape({
    fullName: yup.string().required('Заполните поле!').min(2, 'Слишком короткое имя!'),
    email: yup.string().required('Укажите почту!').email('Неверная почта!'),
    password: yup.string().when('email', {
        is: (value: string) => value.includes('@'),
        then: yup.string().required('Введите пароль!').min(4, 'Пароль должен состоять минимум из 4-х символов!')
    }),
});

const Registration: React.FC<RegistrationProps> = ({onClose}) => {
    const [passwordVisibility, setPasswordVisibility] = React.useState(false);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<FormInput>({
        resolver: yupResolver(schema)
    });

    const togglePassword = () => {
        setPasswordVisibility(!passwordVisibility)
    }
    const onSubmit = (data: FormInput) => {
        dispatch(registrationThunk(data));
        reset();
        onClose();
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p>Регистрация</p>
                <i onClick={onClose}><CloseIcon style={{color: "#373737", cursor: "pointer"}}/></i></div>
            <div className={styles.name}>
                <label>Имя и фамилия</label>
                <input {...register('fullName')}/>
                {errors?.fullName && <p className="yupErrors">{errors.fullName.message}</p>}</div>
            <div className={styles.email}>
                <label>Email</label>
                <input {...register('email')}/>
                {errors?.email && <p className="yupErrors">{errors.email.message}</p>}</div>
            <div className={styles.password}>
                <label>Пароль</label>
                <input {...register('password')}
                       type={!passwordVisibility ? "password" : "text"}/>
                <i onClick={togglePassword}>{passwordVisibility ? <VisibilityIcon/> : <VisibilityOffIcon/>}</i>
                {errors?.password && <p className="yupErrors">{errors.password.message}</p>}</div>
            <div onClick={handleSubmit(onSubmit)} className={`${styles.button} ${styles.buttonAuth}`}>
                <YellowButton nameButton={"Зарегистрироваться"}/></div>
        </div>
    );
};

export default Registration;