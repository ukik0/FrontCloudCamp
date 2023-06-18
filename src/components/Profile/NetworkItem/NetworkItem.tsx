import { Anchor, Stack } from '@/components/ui';
import { Icons } from '@/components';

interface NetworkItemProps {
    url: string;
    name: string;
}

export const NetworkItem = ({ url, name }: NetworkItemProps) => {
    return (
        <Anchor target='_blank' key={url} to={url}>
            <Stack.H gap='4'>
                <img src={Icons.Folder} alt='folder' /> {name}
            </Stack.H>
        </Anchor>
    );
};
