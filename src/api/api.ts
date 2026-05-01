import { getErrorMessageByStatus } from '../shared/utils/api-error-messages';
import { DEFAULT_ERROR_MESSAGE } from '../shared/constants/messages';

const SCRYFALL_API = 'https://api.scryfall.com';

export const scryfallApi = {
  async fetchData(endpoint: string) {
    try {
      const response = await fetch(`${SCRYFALL_API}${endpoint}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'User-Agent': 'rs-react-app/1.0',
        },
      });

      if (!response.ok) {
        throw new Error(getErrorMessageByStatus(response.status));
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(DEFAULT_ERROR_MESSAGE);
    }
  },
};
