import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getComplaintData, getComplaintError, getComplaintIsLoading,
} from '../../model/selectors/getComplaintData';
import classes from './ComplaintCard.module.scss';

interface ComplaintCardProps {
    className?: string;
}

export const ComplaintCard = memo((props: ComplaintCardProps) => {
    const { className } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const complaint = useSelector(getComplaintData);
    const complaintError = useSelector(getComplaintError);
    const isComplaintLoading = useSelector(getComplaintIsLoading);

    return (
        <div className={classNames(classes.ComplaintCard, {}, [className])} />
    );
});
