import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export const Horizontal = ({ ...rest }: HStackProps) => (
    <Flex direction='row' {...rest} />
);
