import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, ReactNode, useCallback, useState,
} from 'react';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { HStack, VStack } from 'shared/UI/Stack';
import {
    banUser, unbanUser, User, UserRoles,
} from 'entities/User';
import { Button } from 'shared/UI/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import ApproveIcon from 'shared/assets/icons/approve.svg';
import BanIcon from 'shared/assets/icons/ban.svg';
import { Modal } from 'shared/UI/Modal';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Paginator } from 'shared/UI/Paginator';
import { Alert } from 'shared/UI/Alert';
import { useUsersListQuery } from '../../../api/usersListApi';
import classes from './UsersList.module.scss';

interface UsersListProps {
    className?: string;
    page: number
    setPage: (page: number) => void;
}

export const UsersList = memo((props: UsersListProps) => {
    const {
        className,
        page,
        setPage,
    } = props;

    const { t } = useTranslation('AdminPanelPage');
    const dispatch = useAppDispatch();

    const { data: users, isLoading, error } = useUsersListQuery(page);

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [banReason, setBanReason] = useState<string>('');
    const [selectedUserId, setSelectedUserId] = useState<string>('');

    const banButtonClickedHandler = useCallback(async (index: number, userId: string) => {
        setSelectedUserId(userId);
        if (users && !users[index].isBanned) {
            setIsModalOpened(true);
        } else {
            const result = await dispatch(unbanUser(userId));

            if (result.meta.requestStatus === 'fulfilled') {
                alert(t('Пользователь разблокирован') as string);
            } else {
                alert(t('Произошла ошибка') as string);
                setIsModalOpened(false);
            }
        }
    }, [dispatch, t, users]);

    const banUserHandler = useCallback(async () => {
        const result = await dispatch(banUser({ userId: selectedUserId, banReason }));

        if (result.meta.requestStatus === 'fulfilled') {
            alert(t('Пользователь заблокирован') as string);
            setIsModalOpened(false);
        } else {
            alert(t('Произошла ошибка') as string);
            setIsModalOpened(false);
        }
    }, [banReason, dispatch, selectedUserId, t]);

    let content: ReactNode;

    if (isLoading) {
        content = (
            <VStack gap="16">
                {new Array(10)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} width="100%" height={30} border="15px" />
                    ))}
            </VStack>
        );
    } else if (!users?.length) {
        content = (
            <Alert variant="warning">
                {t('Странно, но пользователей нет')}
            </Alert>
        );
    } else if (error) {
        content = (
            <Alert variant="danger">
                {t('Произошла ошибка во время подгрузки пользователей')}
            </Alert>
        );
    } else {
        content = (
            <VStack className={classNames(classes.UsersList, {}, [className])}>
                <div className={classes.tableRow}>
                    <h3>{t('id')}</h3>
                    <h3>{t('Почта')}</h3>
                    <h3>{t('Последнее посещение')}</h3>
                    <h3>{t('Тип')}</h3>
                    <h3>{t('Действия')}</h3>
                </div>
                {users.length
                    ? users.map((user: User, index) => (
                        <div className={classes.tableRow} key={index}>
                            <p>{user._id}</p>
                            <p>{user.email}</p>
                            <p>23.05.2023 г.</p>
                            <p>{user?.roles.includes(UserRoles.OWNER) ? 'Арендодатель' : 'Арендатор'}</p>
                            <HStack max justify="center" align="center">
                                <Button
                                    disabled={!user.isBanned}
                                    onClick={() => banButtonClickedHandler(index, user._id)}
                                    variant="clear"
                                >
                                    <Icon Svg={ApproveIcon} className={classes.icon} />
                                </Button>
                                <Button
                                    disabled={user.isBanned}
                                    onClick={() => banButtonClickedHandler(index, user._id)}
                                    variant="clear"
                                >
                                    <Icon Svg={BanIcon} className={classes.icon} />
                                </Button>
                            </HStack>
                        </div>
                    ))
                    : ''}
                <Modal
                    title={t('Заблокировать пользователя?') as string}
                    isOpen={isModalOpened}
                    setIsOpen={setIsModalOpened}
                >
                    <VStack gap="20">
                        <HStack max align="start">
                            <b>{`${t('Причина блокировки')}:`}</b>
                            <TextArea
                                placeholder={t('Введите причину блокировки') as string}
                                value={banReason}
                                onChange={setBanReason}
                            />
                        </HStack>
                        <HStack max justify="end" align="center">
                            <Button
                                onClick={banUserHandler}
                                variant="danger"
                                disabled={!banReason}
                            >
                                {t('Заблокировать')}
                            </Button>
                            <Button
                                style={{ opacity: 0.4 }}
                                onClick={() => setIsModalOpened(false)}
                            >
                                {t('Отменить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </VStack>
        );
    }

    return (
        <VStack justify="between" align="center" className={classes.mainWrapper}>
            {content}
            <Paginator currentPage={page} setCurrentPage={setPage} />
        </VStack>
    );
});
