'use client';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/store';

const store: AppStore = makeStore();

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
