import React from 'react';
import "./notification.css";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { deleteMsg } from '../../store/slices/MsgSlice';

const Notification = () => {

    const msg = useSelector(state => state.msg);
    const dispatch = useDispatch();
    // console.log(msg.msgType);

    const handleClick = () => {
        dispatch(deleteMsg());
    }

    return (
        <>
            <div className={`notification_container ${msg.msgType!== null ? "active" : ""}`}>
                <span className="material-icons close_msg" onClick={handleClick}>clear</span>
                <div className="notification_info">
                    {(msg.msgType==="success" && msg.msgType !== null) && <div className="msg_type success"> <span className="material-icons"> check_circle </span> </div> }
                    {(msg.msgType!=="success" && msg.msgType !== null) && <div className="msg_type error"> <span className="material-icons"> error </span> </div> }
                    <div className="msg_container"> {msg.msgContent} </div>
                    {/* <div className="msg_container"> All the messages from the backend database of our servers, will be shown here. success and failure can be found here. </div> */}
                </div>
                {msg.msgType !== null && <div className={`progress_bar ${msg.msgType=== "success" ? "success" : "error"}`}></div>}
            </div>

        </>
    )
}

export default Notification