import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

export const Vertical = ({ align, ...rest }: VStackProps) => {
    return <Flex {...rest} direction='column' align={align} />;
};
