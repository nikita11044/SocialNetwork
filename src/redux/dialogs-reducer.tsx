import {v1} from "uuid";
import {AddPostActionType, UpdatePostTextActionType} from "./profile-reducer";

let initialState = {
    dialogs: [
        {id: v1(), name: 'Dietrich'},
        {id: v1(), name: 'Wolfgang'},
        {id: v1(), name: 'Helen'},
        {id: v1(), name: 'Klaus'},
        {id: v1(), name: 'Brigitte'},
        {id: v1(), name: 'Marlene'}
    ],
    messages: [
        {id: v1(), message: 'Hi!'},
        {id: v1(), message: 'How are you?'},
        {id: v1(), message: 'Yo'}
    ],
    newMessageBody: ''
}

type InitialStateType = typeof initialState

const dialogsReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "UPDATE-MESSAGE-BODY": {
            const stateCopy = {...state}
            stateCopy.newMessageBody = action.newMessageBody
            return stateCopy
        }
        case "SEND-MESSAGE": {
            const stateCopy = {...state}
            const oldMessages = state.messages
            const body  = state.newMessageBody
            stateCopy.newMessageBody = ''
            stateCopy.messages = [...oldMessages, {id: v1(), message: body}]
            return stateCopy
        }
        default:
            return state
    }
}

export type SendMessageActionType = {
    type: 'SEND-MESSAGE'
}

export type UpdateNewMessageBodyActionType = {
    type: 'UPDATE-MESSAGE-BODY'
    newMessageBody: string
}

export type ActionTypes = AddPostActionType |
    UpdatePostTextActionType |
    SendMessageActionType |
    UpdateNewMessageBodyActionType

export const SendMessageAC = (): SendMessageActionType => {
    return {type: 'SEND-MESSAGE'}
}

export const UpdateNewMessageBodyAC = (newMessageBody: string): UpdateNewMessageBodyActionType => {
    return {type: 'UPDATE-MESSAGE-BODY', newMessageBody: newMessageBody}
}

export default dialogsReducer;