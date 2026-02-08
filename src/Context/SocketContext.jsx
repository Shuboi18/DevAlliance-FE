import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

import { BASE_URL } from "../utils/config";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const user = useSelector((store) => store.user);

    useEffect(() => {
        if (user) {
            const newSocket = io(BASE_URL, {
                withCredentials: true,
            });

            setSocket(newSocket);

            newSocket.on("connect", () => {
                // Connection established
            });

            newSocket.emit("addNewUser", user._id);

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
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

    return (
        <SocketContext.Provider value={{
            socket,
            onlineUsers,
        }}>
            {children}
        </SocketContext.Provider>
    );
};

SocketContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

SocketContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
