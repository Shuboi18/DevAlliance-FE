
import { Phone, PhoneOff, Video } from "lucide-react";
import { useSocket } from "../Context/SocketContext";
import { useEffect } from "react";

const CallModal = () => {
    const {
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        remoteStream,
        name,
        answerCall,
        leaveCall,
        callEnded,
        startVideo,
        isCalling,
        setIsCalling,
        mediaStatus
    } = useSocket();

    // If receiving a call, or currently calling/in-call
    const showModal = call.isReceivingCall || isCalling || callAccepted;

    // Auto-start video when showing modal if not already started
    useEffect(() => {
        if (showModal && !stream) {
            startVideo();
        }
    }, [showModal, stream]);

    // Attach local stream to myVideo
    useEffect(() => {
        if (myVideo.current && stream) {
            myVideo.current.srcObject = stream;
        }
    }, [stream, myVideo]);

    // Attach remote stream to userVideo
    useEffect(() => {
        if (userVideo.current && remoteStream) {
            userVideo.current.srcObject = remoteStream;
        }
    }, [remoteStream, userVideo]);

    if (!showModal || callEnded) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-base-100 p-6 rounded-2xl shadow-2xl w-full max-w-4xl border border-base-300 relative">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {callAccepted ? "Call in Progress" : call.isReceivingCall ? `Incoming Call from ${call.name}` : "Calling..."}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96">
                    {/* My Video */}
                    <div className="relative bg-black rounded-lg overflow-hidden flex items-center justify-center">
                        <video
                            playsInline
                            muted
                            ref={myVideo}
                            autoPlay
                            className="w-full h-full object-cover transform scale-x-[-1]"
                        />
                        <span className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-sm">You</span>
                    </div>

                    {/* Remote Video */}
                    <div className="relative bg-black rounded-lg overflow-hidden flex items-center justify-center">
                        {callAccepted && !callEnded ? (
                            <video
                                playsInline
                                ref={userVideo}
                                autoPlay
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-white/50 animate-pulse">Waiting for video...</div>
                        )}
                        <span className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
                            {callAccepted ? (call.name || "User") : "Remote User"}
                        </span>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-6">
                    {call.isReceivingCall && !callAccepted ? (
                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={() => answerCall(stream)}
                                disabled={!stream && mediaStatus !== 'success'} // Only disable if no stream AND not success (safety)
                                className={`btn btn-primary btn-lg rounded-full animate-bounce ${(!stream) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Phone size={24} /> Answer
                            </button>
                            {mediaStatus === 'loading' && <span className="text-xs text-white/70">Connecting camera...</span>}
                            {mediaStatus === 'idle' && !stream && <span className="text-xs text-white/70">Initializing...</span>}
                            {mediaStatus === 'error' && (
                                <button onClick={startVideo} className="text-xs text-error underline">
                                    Camera failed. Retry?
                                </button>
                            )}
                        </div>
                    ) : null}

                    <button
                        onClick={leaveCall}
                        className="btn btn-error btn-lg rounded-full"
                    >
                        <PhoneOff size={24} /> End Call
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallModal;
