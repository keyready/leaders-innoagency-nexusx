import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { getPlatformData, getPlatformIsLoading } from 'entities/Platform';
import { Button } from 'shared/UI/Button';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/UI/Modal';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { HStack, VStack } from 'shared/UI/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import { getComplaintData, getComplaintIsLoading, submitComplaint } from 'entities/Complaint';
import { Alert } from 'shared/UI/Alert';
import classes from './PlatformHeader.module.scss';

interface PlatformHeaderProps {
    className?: string;
}

export const PlatformHeader = memo((props: PlatformHeaderProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('PlatformPage');

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [complaint, setComplaint] = useState<string>('');

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getPlatformIsLoading);
    const platformId = useSelector(getPlatformData)?._id;
    const image = useSelector(getPlatformData)?.images[0];
    const name = useSelector(getPlatformData)?.name;
    const userId = useSelector(getUserAuthData)?._id;

    const isComplaintLoading = useSelector(getComplaintIsLoading);
    const [complaintResult, setComplaintResult] = useState<string>('');

    const onComplaintClick = useCallback(async () => {
        setIsModalVisible(true);
    }, []);

    const submitComplaintHandler = useCallback(async () => {
        if (!platformId || !userId) {
            alert(t('Невозможно отправить жалобу') as string);
            return;
        }
        const result = await dispatch(submitComplaint({
            platformId,
            userId,
            comment: complaint,
        }));
        if (result.meta.requestStatus === 'fulfilled') {
            setTimeout(() => {
                setIsModalVisible(false);
                setComplaintResult('');
                setComplaint('');
            }, 2000);
            setComplaintResult('Жалоба успешно отправлена!');
        } else {
            alert(t('Произошла ошибка во время отправки жалобы') as string);
            setIsModalVisible(false);
        }
    }, [complaint, dispatch, platformId, t, userId]);

    if (isLoading) {
        return (
            <div className={classNames(classes.PlatformHeader, {}, [className])}>
                <Skeleton
                    width="100%"
                    height={400}
                    border="10px"
                />
            </div>
        );
    }

    return (
        <div className={classNames(classes.PlatformHeader, {}, [className])}>
            <div
                className={classes.PlatformHeaderImage}
                style={{
                    backgroundImage: `linear-gradient(93.03deg, rgba(154, 187, 236, 0.8) 0%, rgba(97, 150, 228, 0.8) 100%), url(${image})`,
                }}
            />
            <h2 className={classes.HeaderTitle}>{name}</h2>
            <div
                className={classes.button}
            >
                <Button
                    variant="danger"
                    onClick={onComplaintClick}
                >
                    {t('Пожаловаться')}
                </Button>
            </div>

            <Modal
                title={t('Отправить жалобу') as string}
                isOpen={isModalVisible}
                setIsOpen={setIsModalVisible}
            >
                <VStack gap="20">
                    <HStack max align="start">
                        <b>{`${t('Ваша жалоба')}:`}</b>
                        <TextArea
                            style={{ minWidth: 500 }}
                            placeholder={t('Подробно опишите, что Вы считаете подозрительным или оскорбительным') as string}
                            value={complaint}
                            onChange={setComplaint}
                        />
                    </HStack>
                    <Button
                        style={{ marginLeft: 'auto' }}
                        variant="danger"
                        disabled={!complaint || isComplaintLoading}
                        onClick={submitComplaintHandler}
                    >
                        {t('Отправить')}
                    </Button>
                    {complaintResult && (
                        <Alert variant="success">{complaintResult}</Alert>
                    )}
                </VStack>
            </Modal>
        </div>
    );
});
