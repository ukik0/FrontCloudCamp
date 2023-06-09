import { Portal } from '@/components/ui';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { clsx } from '@/utils/helpers';
import cl from './Modal.module.scss';
import { useLockBody } from '@/utils/hooks';

interface ModalProps extends ReactTagProps<'div'> {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    className?: string;
    children: ReactNode;
}

export const Modal = ({
    active,
    setActive,
    className,
    children,
    ...rest
}: ModalProps) => {
    useLockBody({ active });

    return (
        <Portal>
            <div
                className={clsx({
                    cls: cl.modal,
                    mods: { [cl.active]: active },
                    additional: [...(className ? [className] : '')]
                })}
                onClick={() => setActive(false)}
                {...rest}
            >
                <div
                    className={clsx({
                        cls: cl.content,
                        mods: { [cl.active]: active }
                    })}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};
