import { createPortal } from 'react-dom';

interface PortalProps {
    children: JSX.Element;
    container?: HTMLElement;
}

export const Portal = ({
    container = document.body,
    children
}: PortalProps) => {
    return createPortal(children, container);
};
