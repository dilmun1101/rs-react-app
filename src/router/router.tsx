import { createBrowserRouter } from 'react-router';
import MainPage from '../pages/main-page/MainPage';
import CardDetails from '../pages/card-details/CardDetails';
import PageNotFound from '../pages/page-not-found/PageNotFound';
import AboutPage from '../pages/about-page/AboutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [{ path: 'details/:cardId', element: <CardDetails /> }],
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  { path: '*', element: <PageNotFound /> },
]);
