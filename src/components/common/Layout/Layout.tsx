import { ReactNode } from 'react';
import cl from './Layout.module.scss';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='container'>
            <div className={cl.wrapper}>{children}</div>
        </div>
    );
};
