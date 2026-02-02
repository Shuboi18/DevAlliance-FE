import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import FeedReducer from "./FeedSlice";
import ConnectionReducer from "./ConnectionSlice";
import ConnectionRequestReducer from "./ConnectionRequestSlice";

const MyStore = configureStore({
  reducer: {
    user: UserReducer,
    Feed: FeedReducer,
    connections: ConnectionReducer,
    requests: ConnectionRequestReducer,
  },
});

export default MyStore;