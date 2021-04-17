import {v1} from "uuid";
import {actions, ActionTypes} from "./action-creators";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {profileAPI} from "../api/api";

export type PostsType = {
    id: string
    message: string
    likesCount: number
}

// export type UserProfileType = {
//     aboutMe: string
//     contacts: {
//         facebook: string,
//         website: string,
//         vk: string,
//         twitter: string,
//         instagram: string,
//         youtube: string,
//         github: string,
//         mainLink: string
//     }
//     lookingForAJob: boolean
//     lookingForAJobDescription: string
//     fullName: string
//     userId: number
//     photos: {
//         small: string
//         large: string
//     }
// }

export type UserProfileType = {
    aboutMe: string,
    contacts: {[key: string]: string},
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: {
        small: string,
        large: string
    }
}

let initialState = {
    posts: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: "It's my first post", likesCount: 11}
    ],
    profile: {
        aboutMe: '',
        contacts: {},
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        userId: 2,
        photos: {
            small: '',
            large: ''
        }
    },
    status: ''
}

type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "ADD-POST": {
            return {
                ...state,
                posts: [action.post, ...state.posts]
            }
        }
        case "SET-USER-PROFILE": {
            return {
                ...state,
                profile: action.profile
            }
        }
        case "SET-STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const requestUserProfile = (userId: string): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>) => {
        profileAPI.getUserProfile(userId)
            .then(response => {
                console.log(response)
                dispatch(actions.setUserProfile(response.data))
            })
    }
}

export const requestStatus = (userId: string): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>) => {
        profileAPI.getStatus(userId)
            .then(response => dispatch(actions.setStatus(response.data)))
    }
}

export const updateStatus = (newStatus: string): ThunkType  => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>) => {
        profileAPI.updateStatus({status: newStatus})
            .then(() => dispatch(actions.setStatus(newStatus)))
    }
}

export default profileReducer;