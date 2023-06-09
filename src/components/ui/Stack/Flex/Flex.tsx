import { ReactNode } from 'react';
import { clsx } from '@/utils/helpers';
import cl from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '0' | '4' | '8' | '16' | '24' | '32';

const justifyClasses: Record<FlexJustify, string> = {
    start: cl.justifyStart,
    center: cl.justifyCenter,
    end: cl.justifyEnd,
    between: cl.justifyBetween
};

const alignClasses: Record<FlexAlign, string> = {
    start: cl.alignStart,
    center: cl.alignCenter,
    end: cl.alignEnd
};

const directionClasses: Record<FlexDirection, string> = {
    row: cl.directionRow,
    column: cl.directionColumn
};

const gapClasses: Record<FlexGap, string> = {
    0: '0',
    4: cl.gap4,
    8: cl.gap8,
    16: cl.gap16,
    24: cl.gap24,
    32: cl.gap32
};

export interface FlexProps extends ReactTagProps<'div'> {
    className?: string;
    children: ReactNode;
    direction: FlexDirection;
    justify?: FlexJustify;
    align?: FlexAlign;
    gap?: FlexGap;
    fill?: boolean;
}

export const Flex = ({
    gap = '0',
    align = 'center',
    className,
    direction = 'row',
    justify = 'start',
    children,
    fill,
    ...rest
}: FlexProps) => {
    return (
        <div
            className={clsx({
                cls: cl.flex,
                mods: { [cl.fill]: fill || false },
                additional: [
                    justifyClasses[justify],
                    alignClasses[align],
                    directionClasses[direction],
                    gapClasses[gap],
                    ...(className ? [className] : '')
                ]
            })}
            {...rest}
        >
            {children}
        </div>
    );
};
