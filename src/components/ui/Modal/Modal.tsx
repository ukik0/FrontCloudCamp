import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Button, Portal, Stack, Typography } from '@/components/ui';
import { Icons } from '@/components';
import { useLockBody } from '@/utils/hooks';
import { clsx } from '@/utils/helpers';
import cl from './Modal.module.scss';

interface ModalProps extends ReactTagProps<'div'> {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    className?: string;
    isSuccess: boolean;
    children: ReactNode;
}

export const Modal = ({
    active,
    setActive,
    className,
    children,
    isSuccess,
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
                    <Stack.V gap='32' fill>
                        <Stack.H fill={true} gap='32' justify='between'>
                            <Typography variant='title-2'>
                                {isSuccess
                                    ? 'Форма успешно отправлена'
                                    : 'Ошибка'}
                            </Typography>

                            <Button
                                icon={Icons.Close}
                                variant='icon'
                                className={cl.close}
                                onClick={() => setActive(false)}
                            />
                        </Stack.H>

                        <Stack.H>
                            <div
                                className={clsx({
                                    cls: cl.icon,
                                    mods: { [cl.failed]: !isSuccess }
                                })}
                            >
                                <img
                                    src={
                                        isSuccess ? Icons.Success : Icons.Failed
                                    }
                                    alt='icon'
                                />
                            </div>
                        </Stack.H>

                        {children}
                    </Stack.V>
                </div>
            </div>
        </Portal>
    );
};
