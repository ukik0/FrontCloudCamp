import { Avatar, Stack, Typography } from '@/components/ui';
import { NetworkItem } from '@/components/Profile';
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
                            <NetworkItem url={url} name={name} />
                        ))}
                    </Stack.H>
                )}
            </Stack.V>
        </Stack.H>
    );
};
