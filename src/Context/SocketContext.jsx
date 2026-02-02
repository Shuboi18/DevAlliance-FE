import { createContext, useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import Peer from "simple-peer";

import { BASE_URL } from "../utils/config";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const user = useSelector((store) => store.user);

    // WebRTC State
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState("");
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [isCalling, setIsCalling] = useState(false); // UI state

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const [otherUser, setOtherUser] = useState(null);

    useEffect(() => {
        if (user) {
            const newSocket = io(BASE_URL, {
                withCredentials: true,
            });

            setSocket(newSocket);

            newSocket.on("connect", () => {
                setMe(newSocket.id);
            });
            if (newSocket.id) setMe(newSocket.id);

            newSocket.emit("addNewUser", user._id);

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            newSocket.on("callUser", ({ from, name: callerName, signal }) => {
                setCall({ isReceivingCall: true, from, name: callerName, signal });
            });

            newSocket.on("callEnded", () => {
                setCallEnded(true);
                setIsCalling(false);
                setCallAccepted(false);
                setCall({});
                setOtherUser(null);
                if (connectionRef.current) {
                    connectionRef.current.destroy();
                }
                window.location.reload();
            });

            return () => {
                newSocket.close();
                setSocket(null);
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    const [remoteStream, setRemoteStream] = useState(null);

    const answerCall = (currentStream) => {
        setCallAccepted(true);
        setOtherUser(call.from);
        const streamToUse = currentStream || stream;
        if (!streamToUse) {
            console.error("No stream available for answering call");
            return;
        }
        const peer = new Peer({ initiator: false, trickle: false, stream: streamToUse });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: call.from });
        });

        peer.on("stream", (currentStream) => {
            setRemoteStream(currentStream);
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    };

    const callUser = (id, currentStream) => {
        setIsCalling(true);
        setOtherUser(id);
        const peer = new Peer({ initiator: true, trickle: false, stream: currentStream || stream });

        peer.on("signal", (data) => {
            socket.emit("callUser", { userToCall: id, signalData: data, from: me, name: user.fname });
        });

        peer.on("stream", (currentStream) => {
            setRemoteStream(currentStream);
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        if (otherUser) {
            socket.emit("endCall", { to: otherUser });
        }

        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        setIsCalling(false);
        setCallAccepted(false);
        setCall({});
        setRemoteStream(null);
        setOtherUser(null);
        window.location.reload();
    };

    const [mediaStatus, setMediaStatus] = useState('idle'); // idle, loading, success, error

    const startVideo = async () => {
        setMediaStatus('loading');
        try {
            const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(currentStream);
            // Ref assignment moved to component
            setMediaStatus('success');
            return currentStream;
        } catch (err) {
            console.error("Error accessing media devices:", err);
            setMediaStatus('error');
        }
    };


    return (
        <SocketContext.Provider value={{
            socket,
            onlineUsers,
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            remoteStream,
            name: user?.fname,
            callUser,
            answerCall,
            leaveCall,
            callEnded,
            startVideo,
            isCalling,
            setIsCalling,
            mediaStatus
        }}>
            {children}
        </SocketContext.Provider>
    );
};

SocketContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
