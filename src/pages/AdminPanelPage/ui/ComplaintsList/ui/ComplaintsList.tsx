import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { HStack } from 'shared/UI/Stack';
import { Alert } from 'shared/UI/Alert';
import { Button } from 'shared/UI/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import ApproveIcon from 'shared/assets/icons/approve.svg';
import BanIcon from 'shared/assets/icons/ban.svg';
import { Badges } from 'shared/UI/Badges';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { acceptComplaint, dismissComplaint } from 'entities/Complaint';
import { useComplaintsListQuery } from '../../../api/complaintsListApi';
import classes from './ComplaintsList.module.scss';

interface ComplaintsListProps {
    className?: string;
}

export const ComplaintsList = memo((props: ComplaintsListProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('AdminPanelPage');
    const dispatch = useAppDispatch();

    const { data: complaints, error, isLoading } = useComplaintsListQuery('', {
        pollingInterval: 500,
    });

    const acceptComplaintHandler = useCallback(async (complaintId: string) => {
        dispatch(acceptComplaint({ complaintId }));
    }, [dispatch]);
    const dismissComplaintHandler = useCallback(async (complaintId: string) => {
        dispatch(dismissComplaint({ complaintId }));
    }, [dispatch]);

    if (isLoading) {
        return (
            <Skeleton width="100%" height={100} border="30px" />
        );
    }

    if (error) {
        return (
            <HStack max>
                <Alert variant="danger">
                    {t('Произошла ошибка во время загрузки жалоб')}
                </Alert>
            </HStack>
        );
    }

    if (!complaints?.length) {
        return (
            <HStack max>
                <Alert variant="success">
                    {t('Отличные новости, жалоб нет!')}
                </Alert>
            </HStack>
        );
    }

    return (
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

                    {complaint.decision !== 'Отклонено' || !complaint.decision
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
});
