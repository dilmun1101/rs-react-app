import { getErrorMessageByStatus } from '../shared/utils/api-error-messages';
import { DEFAULT_ERROR_MESSAGE } from '../shared/constants/messages';
import type { ScryfallListResponseDTO } from '../shared/constants/types';

const SCRYFALL_API = 'https://api.scryfall.com';

export const scryfallApi = {
  async fetchData(endpoint: string): Promise<ScryfallListResponseDTO> {
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

      const data: unknown = await response.json();
      return data as ScryfallListResponseDTO;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(DEFAULT_ERROR_MESSAGE, { cause: error });
    }
  },
};
