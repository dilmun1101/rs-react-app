import {
  HTTPS_ERROR_MESSAGES,
  DEFAULT_ERROR_MESSAGE,
} from '../../constants/messages';

export const getErrorMessageByStatus = (status: number): string => {
  return HTTPS_ERROR_MESSAGES[status] ?? DEFAULT_ERROR_MESSAGE;
};
