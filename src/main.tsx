import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from '@/components';
import { router } from '@/utils/constants';
import { store } from '@/store';
import '../styles/globals.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    </Provider>
);
