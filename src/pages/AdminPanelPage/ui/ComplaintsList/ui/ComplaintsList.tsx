import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { HStack, VStack } from 'shared/UI/Stack';
import { Alert } from 'shared/UI/Alert';
import { Button } from 'shared/UI/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import ApproveIcon from 'shared/assets/icons/approve.svg';
import BanIcon from 'shared/assets/icons/ban.svg';
import { Badges } from 'shared/UI/Badges';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { acceptComplaint, dismissComplaint, getComplaintIsLoading } from 'entities/Complaint';
import { useSelector } from 'react-redux';
import { Paginator } from 'shared/UI/Paginator';
import { useComplaintsListQuery } from '../../../api/complaintsListApi';
import classes from './ComplaintsList.module.scss';

interface ComplaintsListProps {
    className?: string;
    page: number
    setPage: (page: number) => void;
}

export const ComplaintsList = memo((props: ComplaintsListProps) => {
    const {
        className,
        page,
        setPage,
    } = props;

    const { t } = useTranslation('AdminPanelPage');
    const dispatch = useAppDispatch();

    const { data: complaints, error, isLoading } = useComplaintsListQuery(page);
    const isOneComplaintLoading = useSelector(getComplaintIsLoading);

    const acceptComplaintHandler = useCallback(async (complaintId: string) => {
        const result = await dispatch(acceptComplaint({ complaintId }));
        if (result.meta.requestStatus === 'fulfilled') {
            alert(t('Жалоба успешно принята') as string);
        } else {
            alert(t('Произошла ошибка') as string);
        }
    }, [dispatch, t]);
    const dismissComplaintHandler = useCallback(async (complaintId: string) => {
        const result = await dispatch(dismissComplaint({ complaintId }));
        if (result.meta.requestStatus === 'fulfilled') {
            alert(t('Жалоба успешно отклонена') as string);
        } else {
            alert(t('Произошла ошибка') as string);
        }
    }, [dispatch, t]);

    let content;
    if (isLoading || isOneComplaintLoading) {
        content = (
            <VStack gap="16">
                {new Array(6)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} width="100%" height={50} border="15px" />
                    ))}
            </VStack>
        );
    } else if (error) {
        content = (
            <HStack max>
                <Alert variant="danger">
                    {t('Произошла ошибка во время загрузки жалоб')}
                </Alert>
            </HStack>
        );
    } else if (!complaints?.length) {
        content = (
            <HStack max>
                <Alert variant="success">
                    {t('Отличные новости, жалоб нет!')}
                </Alert>
            </HStack>
        );
    } else {
        content = (
            <div className={classNames(classes.ComplaintsList, {}, [className])}>
                <div className={classes.firstRow}>
                    <b>{t('От кого')}</b>
                    <b>{t('На что')}</b>
                    <b>{t('Суть жалобы')}</b>
                    <b>{t('Статус')}</b>
                    <b>{t('Действия')}</b>
                </div>
                {complaints.map((complaint, index) => (
                    <div className={classes.firstRow} key={index}>
                        <p>{complaint.from}</p>
                        <a
                            className={classes.link}
                            target="_blank"
                            href={`/platform/${complaint.target}`}
                            rel="noreferrer"
                        >
                            {complaint.target}
                        </a>
                        <p className={classes.comment}>
                            {complaint.comment}
                        </p>
                        {complaint.decision === 'Жалоба принята' && (
                            <Badges type="festival">
                                {t('Жалоба принята')}
                            </Badges>
                        )}
                        {!complaint.decision && (
                            <Badges type="mc">
                                {t('На рассмотрении') as string}
                            </Badges>
                        )}
                        {complaint.decision === 'Отклонено' && (
                            <Badges type="lecture">
                                {t('Отклонено') as string}
                            </Badges>
                        )}

                        {complaint.decision !== 'Отклонено' && complaint.decision !== 'Жалоба принята'
                            ? (
                                <HStack max justify="center" align="center">
                                    <Button
                                        onClick={() => acceptComplaintHandler(complaint._id)}
                                        variant="clear"
                                    >
                                        <Icon Svg={ApproveIcon} className={classes.icon} />
                                    </Button>
                                    <Button
                                        onClick={() => dismissComplaintHandler(complaint._id)}
                                        variant="clear"
                                    >
                                        <Icon Svg={BanIcon} className={classes.icon} />
                                    </Button>
                                </HStack>
                            )
                            : ''}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <VStack
            gap="20"
            align="center"
            justify="between"
            className={classes.mainWrapper}
        >
            {content}
            <Paginator
                currentPage={page}
                setCurrentPage={setPage}
            />
        </VStack>
    );
});
