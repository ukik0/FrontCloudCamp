import { Anchor, Stack, Typography } from '@/components/ui';
import { Avatar, Icons } from '@/components';
import cl from './Profile.module.scss';

interface ProfileProps {
    fullName: `${string} ${string}`;
    networks?: Network[];
}

export const Profile = ({ fullName, networks }: ProfileProps) => {
    const initials = fullName.split(' ') as [string, string];

    return (
        <Stack.H gap='24' className={cl.wrapper}>
            <Avatar initials={initials} />
            <Stack.V align='start' gap='8'>
                <Typography variant={'title-1'}>{fullName}</Typography>
                {networks && (
                    <Stack.H gap='16' className={cl.networks}>
                        {networks.map(({ url, name }) => (
                            <Anchor target='_blank' key={url} to={url}>
                                <Stack.H gap='4'>
                                    <img src={Icons.Folder} alt='folder' />{' '}
                                    {name}
                                </Stack.H>
                            </Anchor>
                        ))}
                    </Stack.H>
                )}
            </Stack.V>
        </Stack.H>
    );
};
