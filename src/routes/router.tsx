import { RouteObject, createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './constants';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

import { Home, Popular, Show, TopRated, Upcoming } from '../pages';
import { Favorites } from '../pages/Favorites';

const routes: RouteObject[] = [
    {
        path: '/', element: <PrivateRouter />,
        children: [
            { path: ROUTES.HOME, element: <Home />},
            { path: ROUTES.POPULAR, element: <Popular />},
            { path: ROUTES.TOPRATED, element: <TopRated />},
            { path: ROUTES.UPCOMING, element: <Upcoming />},
            { path: `${ROUTES.SHOW}:id`, element: <Show />},
            { path: ROUTES.FAVORITES, element: <Favorites />},
        ]
    },
    {
        path: '/login', element: <PublicRouter />,
        children: [
            { path: '/login', element: <div> Login </div>},
        ]
    },
];

export const router = createBrowserRouter(routes);
