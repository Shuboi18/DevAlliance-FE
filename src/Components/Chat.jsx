import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Send, MessageCircle, Phone, Video } from "lucide-react";
import toast from "react-hot-toast";
import { useSocket } from "../Context/SocketContext";

import { BASE_URL } from "../utils/config";

const Chat = () => {
    const user = useSelector((store) => store.user);
    const location = useLocation();
    const { socket, callUser, startVideo } = useSocket();

    const [connections, setConnections] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    // 1. Handle Navigation
    useEffect(() => {
        if (location.state?.selectedUser) {
            setSelectedUser(location.state.selectedUser);
        }
    }, [location.state]);

    // Fetch Connections
    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await axios.get(
                    BASE_URL + "/connect/myConnections",
                    { withCredentials: true }
                );
                setConnections(res.data.data);
            } catch (err) {
                console.error("Error fetching connections:", err);
            }
        };
        fetchConnections();
    }, []);

    // 4. Listen for Messages
    useEffect(() => {
        if (socket) {
            const handleMessage = (message) => {
                if (
                    selectedUser &&
                    (message.senderId === selectedUser._id ||
                        message.senderId === user._id)
                ) {
                    setMessages((prev) => [...prev, message]);
                }
            };

            socket.on("receive_message", handleMessage);

            return () => {
                socket.off("receive_message", handleMessage);
            };
        }
    }, [socket, selectedUser, user]);

    // Join Room & Fetch History when User Selected
    useEffect(() => {
        if (socket && selectedUser && user) {
            socket.emit("join_chat", {
                userId: user._id,
                targetUserId: selectedUser._id,
            });

            const fetchHistory = async () => {
                try {
                    const res = await axios.get(
                        `${BASE_URL}/chat/${selectedUser._id}`,
                        { withCredentials: true }
                    );
                    setMessages(res.data);
                } catch (err) {
                    console.error("Error fetching chat history:", err);
                    toast.error("Failed to load chat history");
                }
            };
            fetchHistory();
        }
    }, [selectedUser, user, socket]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket || !selectedUser) return;

        const messageData = {
            senderId: user._id,
            receiverId: selectedUser._id,
            message: newMessage,
        };

        socket.emit("send_message", messageData);
        setNewMessage("");
    };

    const handleVideoCall = async () => {
        if (!selectedUser) return;
        const stream = await startVideo();
        callUser(selectedUser._id, stream);
    };

    if (!user) return <div className="flex justify-center p-10">Loading...</div>;

    return (
        <div className="flex h-[calc(100vh-100px)] bg-base-100 rounded-xl overflow-hidden shadow-2xl border border-base-300">
            {/* Sidebar - Connections List */}
            <div className="w-1/3 border-r border-base-300 bg-base-200/50 flex flex-col">
                <div className="p-4 border-b border-base-300 bg-base-100">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <MessageCircle className="text-primary" /> Chats
                    </h2>
                </div>
                <div className="overflow-y-auto flex-1 p-2 space-y-2">
                    {connections.map((conn) => (
                        <div
                            key={conn._id}
                            onClick={() => setSelectedUser(conn)}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-base-300 ${selectedUser?._id === conn._id
                                ? "bg-primary text-primary-content shadow-md"
                                : "bg-base-100"
                                }`}
                        >
                            <div className="avatar online">
                                <div className="w-12 rounded-full">
                                    <img
                                        src={
                                            conn.photoURL ||
                                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        }
                                        alt={conn.fname}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h3 className="font-semibold truncate">
                                    {conn.fname} {conn.lname}
                                </h3>
                                <p className={`text-xs truncate ${selectedUser?._id === conn._id ? "text-primary-content/70" : "text-base-content/60"}`}>
                                    {conn.bio || "Available"}
                                </p>
                            </div>
                        </div>
                    ))}
                    {connections.length === 0 && (
                        <div className="text-center p-5 opacity-50">No connections to chat with.</div>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-base-100 relative">
                {selectedUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-base-300 flex justify-between items-center bg-base-100 shadow-sm z-10">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            src={
                                                selectedUser.photoURL ||
                                                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                            }
                                            alt={selectedUser.fname}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold">
                                        {selectedUser.fname} {selectedUser.lname}
                                    </h3>
                                    <span className="text-xs text-green-500 flex items-center gap-1">
                                        ● Online
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="btn btn-ghost btn-circle" onClick={handleVideoCall}>
                                    <Phone size={20} />
                                </button>
                                <button className="btn btn-ghost btn-circle" onClick={handleVideoCall}>
                                    <Video size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/5">
                            {messages.map((msg, idx) => {
                                const isMe = msg.senderId === user._id;
                                return (
                                    <div
                                        key={idx}
                                        className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                                    >
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <img
                                                    src={
                                                        isMe
                                                            ? user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                                            : selectedUser.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                                    }
                                                    alt="avatar"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={`chat-bubble ${isMe
                                                ? "chat-bubble-primary text-primary-content"
                                                : "chat-bubble-secondary text-secondary-content"
                                                }`}
                                        >
                                            {msg.message}
                                        </div>
                                        <div className="chat-footer opacity-50 text-xs mt-1">
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={sendMessage} className="p-4 border-t border-base-300 bg-base-100">
                            <div className="join w-full">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="input input-bordered join-item w-full focus:outline-none"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary join-item">
                                    <Send size={20} />
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-base-content/50">
                        <MessageCircle size={64} className="mb-4 opacity-20" />
                        <h3 className="text-xl font-semibold">Select a conversation</h3>
                        <p>Choose a connection from the left to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
