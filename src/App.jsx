// Final Code for DevAlliance
import { Provider } from "react-redux"
import MyStore from "./assets/MyStore"
import Body from "./Components/Body"
import { SocketContextProvider } from "./Context/SocketContext"


const App = () => {

  return (
    <div>
      <Provider store={MyStore}>
        <SocketContextProvider>
          <Body />
        </SocketContextProvider>
      </Provider>
    </div>)
}
export default App