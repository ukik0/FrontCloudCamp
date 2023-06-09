import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/utils/constants';
import { Layout } from '@/components';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '../styles/globals.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Layout>
                <RouterProvider router={router} />
            </Layout>
        </Provider>
    </React.StrictMode>
);
