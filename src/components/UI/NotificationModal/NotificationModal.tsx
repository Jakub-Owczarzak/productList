import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeNotificationModal } from "../../../redux/actions/modalActionCreator";
import { RootState } from "../../../redux/reducers";

import styles from "./notificationModal.module.scss";

const NotificationModal = () => {
  const { message, error } = useSelector(
    (state: RootState) => state.modal
  );
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeNotificationModal());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleCloseModal();
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`${styles.mainContainer} ${error && styles.error}`}>
      <p className={styles.message}>{message}</p>
      <div className={styles.closeButton} onClick={handleCloseModal}>
        <span>Zamknij</span>
      </div>
    </div>
  );
};

export default NotificationModal;
