import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, memo, useState } from 'react';
import { Tab } from '@headlessui/react';
import { HStack } from '../../Stack';
import classes from './Timepicker.module.scss';

export interface SelectedTime {
    startTime: string;
    finishTime: string
}

interface TimepickerProps {
    className?: string;
    availableTime: string[];
    selectedTime: SelectedTime;
    setSelectedTime: (times: SelectedTime) => void;
}

export const Timepicker = memo((props: TimepickerProps) => {
    const {
        className,
        availableTime,
        selectedTime,
        setSelectedTime,
    } = props;

    const [selectedTab, setSelectedTab] = useState<number>(0);

    return (
        <Tab.Group
            selectedIndex={selectedTab}
            onChange={setSelectedTab}
            as="div"
            className={classes.TabGroup}
        >
            <Tab.List
                className={classes.ListGroup}
                as={HStack}
                justify="start"
                align="center"
            >
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <div className={classNames(classes.tab, {
                            [classes.selectedTab]: selected,
                        })}
                        >
                            <div>Время начала</div>
                            <div className={classes.timeCheck}>
                                {selectedTime.startTime || 'Выберите время'}
                            </div>
                        </div>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <div className={classNames(classes.tab, {
                            [classes.selectedTab]: selected,
                        })}
                        >
                            <div>Время завершения</div>
                            <div className={classes.timeCheck}>
                                {selectedTime.finishTime || 'Выберите время'}
                            </div>
                        </div>
                    )}
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel
                    className={classes.panel}
                >
                    {availableTime
                        .map((time) => (
                            <div
                                key={time}
                                className={classes.timeCell}
                                onClick={() => {
                                    setSelectedTime({
                                        ...selectedTime, startTime: time,
                                    });
                                    setSelectedTab(1);
                                }}
                            >
                                {time}
                            </div>
                        ))}
                </Tab.Panel>
                <Tab.Panel
                    className={classes.panel}
                >
                    {availableTime
                        .filter(
                            (_, index) => index > availableTime
                                .indexOf(selectedTime.startTime),
                        )
                        .map((time) => (
                            <div
                                key={time}
                                className={classes.timeCell}
                                onClick={() => {
                                    setSelectedTime({
                                        ...selectedTime, finishTime: time,
                                    });
                                }}
                            >
                                {time}
                            </div>
                        ))}
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
});
