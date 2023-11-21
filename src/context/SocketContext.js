import io from "socket.io-client";
import React from "react";

const socket_url = "https://connect4backend-6e5c5a6e1b7e.herokuapp.com/";
// const socket_url = "http://localhost:5000";

export const socket = io.connect(socket_url);
export const SocketContext = React.createContext();