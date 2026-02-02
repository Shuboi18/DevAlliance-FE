
import { Provider } from "react-redux"
import MyStore from "./assets/MyStore"
import Body from "./Components/Body"
import { SocketContextProvider } from "./Context/SocketContext"
import CallModal from "./Components/CallModal"

const App = () => {

  return (
    <div>
      <Provider store={MyStore}>
        <SocketContextProvider>
          <Body />
          <CallModal />
        </SocketContextProvider>
      </Provider>
    </div>)
}
export default App