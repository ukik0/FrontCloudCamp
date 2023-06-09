import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { CreatePage } from '@/pages/CreatePage';

enum AppRoutes {
    'ROOT' = 'ROOT',
    'CREATE' = 'CREATE',
    'ERROR' = 'ERROR'
}

export const ROUTES: Record<AppRoutes, string> = {
    [AppRoutes.ROOT]: '/',
    [AppRoutes.CREATE]: '/create',
    [AppRoutes.ERROR]: '*'
};

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <HomePage />
    },
    {
        path: ROUTES.CREATE,
        element: <CreatePage />
    },
    { path: ROUTES.ERROR, element: 'Error' }
]);
