import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {actions} from "../../redux/action-creators";
import {DialogsType, MessageType} from "../../redux/dialogs-reducer";

type StateType = {
    dialogs: DialogsType[]
    messages: MessageType[]
}

type MapStateToPropsType = {
    dialogs: DialogsType[]
    messages: MessageType[]
    newMessageBody: string
    isAuth: boolean
}

type MapDispatchToPropsType = {
    sendMessage: () => void
    updateNewMessageBody: (newMessageBody: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class DialogsContainer extends React.Component<PropsType, StateType> {
    render() {
        return <Dialogs isAuth={this.props.isAuth}
        newMessageBody={this.props.newMessageBody}
        dialogs={this.props.dialogs}
        messages={this.props.messages}
        sendMessage={this.props.sendMessage}
        updateNewMessageBody={this.props.updateNewMessageBody}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogReducer.dialogs,
        messages: state.dialogReducer.messages,
        newMessageBody: state.dialogReducer.newMessageBody,
        isAuth: state.authReducer.isAuth
    }
}

// const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => {
//     return {
//         onClickSendMessage: () => {
//             dispatch(actions.sendMessage())
//         },
//         onNewMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
//             dispatch(actions.updateNewMessageBody(e.currentTarget.value))
//         }
//     }
// }

const {sendMessage, updateNewMessageBody} = actions

export default connect(mapStateToProps, {sendMessage, updateNewMessageBody})(DialogsContainer)