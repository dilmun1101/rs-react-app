const SCRYFALL_API = 'https://api.scryfall.com';

export const scryfallApi = {
  async fetchData(endpoint: string) {
    const response = await fetch(`${SCRYFALL_API}${endpoint}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'rs-react-app/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTPS ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  },
};
