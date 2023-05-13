import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import classes from './Carousel.module.scss';
import NextArrowIcon from '../icons/nextArrow.svg';
import PrevArrowIcon from '../icons/prevArrow.svg';

interface CarouselProps {
    className?: string;
    images: string[];
}

export const Carousel = memo((props: CarouselProps) => {
    const {
        className,
        images,
    } = props;

    const [currentImage, setCurrentImage] = useState<number>(0);

    const prevImage = useCallback(() => {
        if (currentImage <= 0) {
            return;
        }
        setCurrentImage((prevState) => prevState - 1);
    }, [currentImage]);

    const nextImage = useCallback(() => {
        if (currentImage >= images.length - 1) {
            return;
        }
        setCurrentImage((prevState) => prevState + 1);
    }, [currentImage, images.length]);

    return (
        <div className={classNames(classes.CarouselWrapper, {}, [className])}>
            <Button
                className={classes.arrowsWrapper}
                onClick={prevImage}
                variant="clear"
            >
                <Icon Svg={PrevArrowIcon} className={classes.arrows} />
            </Button>
            <img
                className={classes.image}
                src={images[currentImage]}
                alt=""
            />
            <Button
                className={classes.arrowsWrapper}
                onClick={nextImage}
                variant="clear"
            >
                <Icon Svg={NextArrowIcon} className={classes.arrows} />
            </Button>
        </div>
    );
});
