import { ModalActionTypes } from "../action-types/action-types";
import { ModalAction } from "../actions/modalActionCreator";

interface ModalState {
  isOpen: boolean;
  error: boolean;
  message: string | null;
  contentModalIsOpen: boolean;
  id: number | null;
}

const initialState: ModalState = {
  isOpen: false,
  contentModalIsOpen: false,
  error: false,
  message: null,
  id: null,
};

const ModalReducer = (
  state = initialState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case ModalActionTypes.CONTEN_MODAL_OPEN:
      return {
        ...state,
        contentModalIsOpen: true,
        id: action.payload.id,
        message: action.payload.message,
      };
    case ModalActionTypes.CONTEN_MODAL_CLOSE:
      return { ...state, contentModalIsOpen: false, id: null };
    case ModalActionTypes.OPEN:
      return {
        ...state,
        isOpen: true,
        message: action.payload.message,
        error: action.payload.error,
      };
    case ModalActionTypes.CLOSE:
      return { ...state, isOpen: false, message: null };
    default:
      return state;
  }
};

export default ModalReducer;
