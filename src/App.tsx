import "./App.css";
import { Outlet } from "react-router-dom";
import NotificationModal from "./components/UI/NotificationModal/NotificationModal";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import Modal from "./components/UI/ContentModal/Modal";

function App() {
  const { isOpen } = useSelector((state: RootState) => state.modal);
  return (
    <div className="App">
      <Modal />
      {isOpen && <NotificationModal />}
      <Outlet />
    </div>
  );
}

export default App;
