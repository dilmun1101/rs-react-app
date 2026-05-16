import { createBrowserRouter } from 'react-router';
import MainPage from '../pages/main-page/MainPage';
import CardDetails from '../shared/ui/card-details/CardDetails';
import PageNotFound from '../pages/404/404';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [{ path: 'details/:cardId', element: <CardDetails /> }],
  },
  { path: '*', element: <PageNotFound /> },
]);
