import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { CostTypesBadges } from 'shared/UI/CostBadges';
import { Icon } from 'shared/UI/Icon/Icon';
import MarkerIcon from 'shared/assets/icons/marker.svg';
import ClockIcon from 'shared/assets/icons/clock.svg';
import { Card } from 'shared/UI/Card/Card';
import { Platform } from '../../model/types/Platform';
import { PlatformCardHeader } from '../PlatformCardHeader/PlatformCardHeader';
import classes from './PlatformCard.module.scss';

const platformMock: Platform = {
    _id: 'jksnfg43qnwfmlk',
    cost: null,
    mainPhoto: '/images/image1.png',
    name: '“Война и мир” на Петроградке',
    subtitle: 'А тут чел внезапно решит написать войну и мир и пойдет нахуй, потому что максимум 250 символов ебать!',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid, amet assumenda at consectetur cum cumque distinctio dolore doloremque dolores facere fugit incidunt, iusto laudantium maxime mollitia neque numquam quae quisquam quod ratione reprehenderit, repudiandae rerum saepe similique suscipit tempora? Atque cum dicta eos, id in iste laborum maiores nemo non pariatur porro quam quo quos repellat, reprehenderit. A adipisci aspernatur, dolore eius error iure iusto nemo nihil perspiciatis placeat possimus, quo quod, repellendus repudiandae tenetur. Excepturi, porro velit! Aliquam architecto cumque facilis fuga harum iste, laborum magni maiores molestiae officiis rem ullam ut voluptate! Expedita nam officia quis reiciendis.',
    address: 'м.Название_метро, ул.Название_улицы, д.00к0 ',
    date: new Date('05.05.2023'),
    bookings: [
        {
            _id: '234234',
            date: new Date(),
            endTime: new Date('23.04.2023 09:00:00'),
            startTime: new Date('23.04.2023 18:00:00'),
            userId: 'kjsdfgnjk34n',
        },
    ],
};

interface PlatformProps {
    className?: string;
}

export const PlatformCard = memo((props: PlatformProps) => {
    const { className } = props;

    const platform = platformMock;
    const cost: CostTypesBadges = platform.cost ? platform.cost < 3000
        ? 'let3000'
        : platform.cost > 3000
            ? 'met3000'
            : 'free'
        : 'free';

    return (
        <Card
            className={classNames(classes.PlatformCard, {}, [className])}
        >
            <VStack
                max
                gap="20"
            >
                <HStack max gap="20">
                    <VStack>
                        <PlatformCardHeader cost={cost} type="lecture" typeName="Лекция" />
                        <h2 className={classes.title}>
                            {platform.name}
                        </h2>
                        <p>{platform.subtitle}</p>
                        <HStack>
                            <Icon Svg={MarkerIcon} className={classes.icon} />
                            <p>{platform.address}</p>
                        </HStack>
                        <HStack>
                            <Icon Svg={ClockIcon} className={classes.icon} />
                            <p>{platform.date.toDateString()}</p>
                        </HStack>
                    </VStack>
                    <img
                        src={platform.mainPhoto}
                        alt={platform.name}
                        className={classes.photo}
                    />
                </HStack>
            </VStack>
        </Card>
    );
});
