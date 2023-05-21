import {
    memo, ReactNode, useCallback, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import classes from './Carousel.module.scss';
import NextArrowIcon from '../icons/nextArrow.svg';
import PrevArrowIcon from '../icons/prevArrow.svg';

interface CarouselProps {
    className?: string;
    content: ReactNode[];
}

export const Carousel = memo((props: CarouselProps) => {
    const {
        className,
        content,
    } = props;

    const [currentNode, setCurrentNode] = useState<number>(0);

    const prevNode = useCallback(() => {
        if (currentNode <= 0) {
            return;
        }
        setCurrentNode((prevState) => prevState - 1);
    }, [currentNode]);

    const nextNode = useCallback(() => {
        if (currentNode >= content.length - 1) {
            return;
        }
        setCurrentNode((prevState) => prevState + 1);
    }, [currentNode, content.length]);

    return (
        <div className={classNames(classes.CarouselWrapper, {}, [className])}>
            <Button
                className={classes.arrowsWrapper}
                onClick={prevNode}
                variant="clear"
            >
                <Icon Svg={PrevArrowIcon} className={classes.arrows} />
            </Button>
            <div className={classes.image}>
                {content[currentNode]}
            </div>
            <Button
                className={classes.arrowsWrapper}
                onClick={nextNode}
                variant="clear"
            >
                <Icon Svg={NextArrowIcon} className={classes.arrows} />
            </Button>
        </div>
    );
});
