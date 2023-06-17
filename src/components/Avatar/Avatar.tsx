import { ReactNode } from 'react';
import { Stack, Typography } from '@/components/ui';
import { clsx } from '@/utils/helpers';
import cl from './Avatar.module.scss';

type Size = 'sm' | 'md' | 'xl';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: Size;
    alt?: string;
    children?: ReactNode;
    fullName?: string;
    initials?: [string, string];
}

export const Avatar = ({
    src,
    size = 'md',
    alt,
    initials,
    className
}: AvatarProps) => {
    const [name, surname] = initials || ['', ''];

    return (
        <Stack.V
            justify='center'
            className={clsx({
                cls: cl.wrapper,
                additional: [cl[size]]
            })}
        >
            {src && (
                <img
                    src={src}
                    alt={alt}
                    className={clsx({
                        cls: cl.avatar,
                        additional: [...(className ? [className] : '')]
                    })}
                />
            )}
            {initials && (
                <Stack.H className={cl.initials}>
                    <Stack.H gap='0' justify='center' align='center'>
                        <Typography
                            className={clsx({ additional: [cl[size]] })}
                            variant={'uppercase'}
                        >
                            {name[0]}
                        </Typography>
                        <Typography
                            className={clsx({ additional: [cl[size]] })}
                            variant={'uppercase'}
                        >
                            {surname[0]}
                        </Typography>
                    </Stack.H>
                </Stack.H>
            )}
        </Stack.V>
    );
};
