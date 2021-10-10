import styles from "./popup.module.css";
import { IoMdClose } from "react-icons/io";
import {
  PopupActionTypes,
  usePopupContext,
} from "../../contexts/PopupContext/usePopupContext";

const Popup = () => {
  const {
    state: {
      popup: { type, message, confirmFn },
    },
    dispatch,
  } = usePopupContext();
  return (
    <div className={styles["popup-container"]}>
      <article className={`${styles.popup} ${styles[type]}`}>
        <p>{message}</p>
        <IoMdClose
          className={`${styles["close-btn"]} ${styles[`close-btn-${type}`]}`}
          onClick={() =>
            dispatch({
              type: PopupActionTypes.DELETE_POPUP,
            })
          }
        />
        {confirmFn && (
          <footer className={styles["popup-footer"]}>
            <button
              className={`btn ${styles[`btn-${type}-secondary`]}`}
              onClick={() =>
                dispatch({
                  type: PopupActionTypes.DELETE_POPUP,
                })
              }
            >
              Cancel
            </button>
            <button
              className={`btn ${styles[`btn-${type}-primary`]}`}
              onClick={() => confirmFn()}
            >
              Confirm
            </button>
          </footer>
        )}
      </article>
    </div>
  );
};

export default Popup;
