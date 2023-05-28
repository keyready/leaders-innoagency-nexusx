import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import PaginatorIcon from 'shared/assets/icons/paginator.svg';
import ArrowIcon from 'shared/assets/icons/right_arrow.svg';
import { Icon } from '../../Icon/Icon';
import { Button } from '../../Button';
import { HStack } from '../../Stack';
import classes from './Paginator.module.scss';

interface PaginatorProps {
    className?: string;
    currentPage: number;
    setCurrentPage: (value: number) => void;
    maxPages?: number;
}

export const Paginator = memo((props: PaginatorProps) => {
    const {
        className,
        currentPage,
        setCurrentPage,
        maxPages,
    } = props;

    const onPageDecrement = useCallback(() => {
        if (currentPage <= 1) setCurrentPage?.(1);
        else setCurrentPage?.(currentPage - 1);
    }, [currentPage, setCurrentPage]);

    const onPageIncrement = useCallback(() => {
        setCurrentPage?.(currentPage + 1);
    }, [currentPage, setCurrentPage]);

    const onChoosePage = useCallback((page: number) => {
        setCurrentPage?.(page);
    }, [setCurrentPage]);

    return (
        <HStack gap="8" className={classNames(classes.Paginator, {}, [className])}>
            <span className={classes.currentPageWrapper}>{currentPage}</span>
            <span>
                <Button
                    variant="clear"
                    onClick={onPageDecrement}
                >
                    <Icon Svg={ArrowIcon} className={classes.leftArrow} />
                </Button>
                {new Array(maxPages || 7)
                    .fill(0)
                    .map((_, index) => (
                        <Button
                            key={index}
                            variant="clear"
                            className={classes.paginatorButton}
                            onClick={() => onChoosePage(index + 1)}
                        >
                            <Icon
                                Svg={PaginatorIcon}
                                className={classNames(classes.paginatorIcon, {
                                    [classes.currentPage]: currentPage >= index + 1,
                                })}
                            />
                        </Button>
                    ))}
                <Button
                    variant="clear"
                    onClick={onPageIncrement}
                >
                    <Icon Svg={ArrowIcon} className={classes.rightArrow} />
                </Button>
            </span>
        </HStack>
    );
});
