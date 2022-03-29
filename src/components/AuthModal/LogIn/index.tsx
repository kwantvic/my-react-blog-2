import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from "react-redux";

import styles from "./LogIn.module.scss";
import YellowButton from "../../UiComponents/YellowButton";
import {logInThunk} from "../../../redux/actions/auth";

type LogInProps = {
    onClose: () => void;
    onRegistration: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: {
        name?: string;
        email: string;
        password: string
    }
}
export interface FormInput {
    name?: string;
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Неверная почта!').required('Укажите почту!'),
    password: yup.string().when('email', {
        is: (value: string) => value.includes('@'),
        then: yup.string().required('Введите пароль!').min(4, 'Пароль должен состоять минимум из 4-х символов!')
    }),
});

const LogIn: React.FC<LogInProps> = ({onClose, onRegistration, onChange, inputValue}) => {
    const [passwordVisibility, setPasswordVisibility] = React.useState(false);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<FormInput>({
        resolver: yupResolver(schema),
    });

    const togglePassword = () => {
        setPasswordVisibility(!passwordVisibility)
    }
    const onSubmit = (data: FormInput) => {
        dispatch(logInThunk(data));
        reset();
        onClose();
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p>Вход в аккаунт</p>
                <i onClick={onClose}><CloseIcon style={{color: "#373737", cursor: "pointer", marginTop: "5px"}}/></i>
            </div>
            <div className={styles.email}>
                <label>Email</label>
                <input {...register('email')}
                       onChange={onChange}
                       value={inputValue.email}/>
                {errors?.email && <p className="yupErrors">{errors.email.message}</p>}</div>
            <div className={styles.password}>
                <label>Пароль</label>
                <input {...register('password')}
                       type={!passwordVisibility ? "password" : "text"}
                       onChange={onChange}
                       value={inputValue.password}/>
                <i onClick={togglePassword}>{passwordVisibility ? <VisibilityIcon/> : <VisibilityOffIcon/>}</i>
                {errors?.password && <p className="yupErrors">{errors.password.message}</p>}</div>
            <div onClick={handleSubmit(onSubmit)} className={`${styles.button} ${styles.buttonIn}`}>
                <YellowButton
                    widthButton={"100%"}
                    heightButton={"49px"}
                    nameButton={"Войти"}/></div>
            <hr/>
            <div onClick={onRegistration} className={`${styles.button} ${styles.buttonAuth}`}>
                <YellowButton
                    widthButton={"100%"}
                    heightButton={"49px"}
                    nameButton={"Зарегистрироваться"}/></div>
        </div>
    );
};

export default LogIn;