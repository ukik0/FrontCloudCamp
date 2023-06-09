import { Anchor, Stack, Typography } from '@/components/ui';
import { Icons } from '@/components';
import cl from './Profile.module.scss';

interface ProfileProps {
    fullName: `${string} ${string}`;
    networks?: Network[];
}

export const Profile = ({ fullName, networks }: ProfileProps) => {
    const [name, surname] = fullName
        .split(' ')
        .map((item) => item[0].toUpperCase() + item.slice(1));

    return (
        <Stack.H gap='24' className={cl.wrapper}>
            <div className={cl.avatar}>
                <Stack.H gap='0' justify='center' align='center'>
                    <Typography variant={'uppercase'}>{name[0]}</Typography>
                    <Typography variant={'uppercase'}>{surname[0]}</Typography>
                </Stack.H>
            </div>
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
