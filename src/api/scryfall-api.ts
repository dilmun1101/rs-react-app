import { getErrorMessageByStatus } from '../shared/utils/api-error-messages/api-error-messages';

const SCRYFALL_API = 'https://api.scryfall.com';

export const scryfallApi = {
  async fetchData<T>(endpoint: string): Promise<T> {
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

    const data: unknown = await response.json();
    return data as T;
  },
};
