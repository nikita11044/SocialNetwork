import React from "react";
import classes from "./Users.module.css";
import {NavLink} from "react-router-dom";
import defaultAvatar from "../../assets/default-user-avatar.jpg";
import {UserType} from "../../redux/users-reducer";

type UsersPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    follow: (userID: string) => void
    unfollow: (userID: string) => void
}

const Users: React.FC<UsersPropsType> = ({
                                             users,
                                             totalUsersCount,
                                             pageSize,
                                             currentPage,
                                             unfollow,
                                             follow,
                                             onPageChanged
                                         }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map((p) => {
                return <span className={currentPage === p ? classes.selectedPage : ''}
                             onClick={() => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {
            users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img className={classes.userPhoto} src={u.photos.small ? u.photos.small : defaultAvatar}
                                 alt="user avatar"/>
                        </NavLink>
                    </div>
                    <div>
                        {
                            u.followed ?
                                <button onClick={() => unfollow(u.id)}>Unfollow</button> :
                                <button onClick={() => follow(u.id)}>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users