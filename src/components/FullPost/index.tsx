import React from 'react';
import {useParams} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReactHtmlParser from 'react-html-parser';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

import styles from "./FullPost.module.scss";
import wallPaperPost from "../../assets/img/wallpaperPost.jpeg"
import {useAuthSelector, useUserPagePostsSelector} from "../../redux/selectors";
import {getDate} from "../../utils/functional";
import {CommentItem} from "../CommentItem";
import YellowButton from "../UiComponents/YellowButton";
import DraggableDialog from "../UiComponents/DraggableDialog";

export const FullPost: React.FC = React.memo(() => {
    const {id} = useParams();
    const postId = id?.replace(':', '') ?? null;
    const post = useUserPagePostsSelector().find((obj) => obj._id === postId);
    const isAuth = useAuthSelector().isAuth;

    function onDelPost() {
        console.log("🧲del post")
    }

    return (
        <div className={styles.wrapper}>
            {post
                ? <div className={styles.header}>
                    <img className={styles.img} src={post.photoUrl ? post.photoUrl : wallPaperPost} alt=""/>
                    <div className={styles.editor}>
                        {isAuth &&
                            <>
                                <div className="tooltip">
                                    <Button variant="text"><EditIcon className={styles.icon}/></Button>
                                    <span className={`tooltiptext ${styles.toolEdit}`}>Редактировать пост</span>
                                </div>
                                <div className="tooltip">
                                    <DraggableDialog title={"Вы действительно хотите удалить пост?"}
                                                     onAction={onDelPost}
                                                     component={<Button variant="text"><DeleteIcon
                                                         className={styles.icon}/>
                                                     </Button>}/>
                                    <span
                                        className={`tooltiptext tooltiptext-delPost ${styles.toolDel}`}>Удалить пост</span>
                                </div>
                            </>
                        }
                    </div>
                    <div className={styles.titlePost}>
                        <div className={styles.info}>
                            <div className={styles.info__date}>{getDate(post.createdAt)}</div>
                            <div className={styles.info__views}>
                                <VisibilityIcon className={styles.eye}/><span>{post.views}</span>
                            </div>
                        </div>
                        <div className={styles.title}>
                            {post.title}
                        </div>
                        <div className={styles.descr}>
                            {post.description}
                        </div>
                    </div>
                    <div className={styles.body}>
                        {ReactHtmlParser(post.text)}
                    </div>
                    <hr/>
                    <div className={styles.comments}>
                        <div className={styles.comments__title}>
                            Комментарии (3)
                        </div>
                        <CommentItem/>
                        <CommentItem/>
                        <CommentItem/>
                        {isAuth &&
                            <div className={styles.form}>
                                <label>Добавить комментарий</label>
                                <textarea/>
                                <div className={styles.button}><YellowButton nameButton={"Отправить"}/></div>
                            </div>}
                    </div>
                </div>
                : <div>wrong</div>
            }
        </div>
    );
});