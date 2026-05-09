import { scryfallService } from './scryfall-service';

test('searchCards returns mapped cards', async () => {
  const result = await scryfallService.searchCards('avatar');

  expect(result.items[0].name).toBe('Avatar');
});
