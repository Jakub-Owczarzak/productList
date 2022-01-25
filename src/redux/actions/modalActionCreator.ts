import { ModalActionTypes } from "../action-types/action-types";

export interface OpenModal {
  type: ModalActionTypes.OPEN;
  payload: { message: string; error: boolean };
}

export interface CloseModal {
  type: ModalActionTypes.CLOSE;
}

export interface OpenContentModal {
  type: ModalActionTypes.CONTEN_MODAL_OPEN;
  payload: { id: number; message: string };
}

export interface CloseContentModal {
  type: ModalActionTypes.CONTEN_MODAL_CLOSE;
}

export type ModalAction =
  | OpenModal
  | CloseModal
  | OpenContentModal
  | CloseContentModal;

export const openNotificationModal = (
  message: string,
  error: boolean
): OpenModal => {
  return {
    type: ModalActionTypes.OPEN,
    payload: { message, error },
  };
};
export const closeNotificationModal = (): CloseModal => {
  return {
    type: ModalActionTypes.CLOSE,
  };
};

export const openDeleteItemModal = (
  id: number,
  message: string
): OpenContentModal => {
  console.log(message);
  return {
    type: ModalActionTypes.CONTEN_MODAL_OPEN,
    payload: { id, message },
  };
};
export const closeDeleteItemModal = (): CloseContentModal => {
  return {
    type: ModalActionTypes.CONTEN_MODAL_CLOSE,
  };
};
