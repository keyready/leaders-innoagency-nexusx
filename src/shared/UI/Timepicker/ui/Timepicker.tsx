import { classNames } from 'shared/lib/classNames/classNames';
import {
    Fragment, memo, useEffect, useMemo, useState,
} from 'react';
import { Tab } from '@headlessui/react';
import { HStack } from '../../Stack';
import classes from './Timepicker.module.scss';

export interface SelectedTime {
    startTime: Date;
    finishTime: Date
}

interface TimepickerProps {
    className?: string;
    selectedTime: SelectedTime;
    setSelectedTime: (times: SelectedTime) => void;
}

export const Timepicker = memo((props: TimepickerProps) => {
    const {
        className,
        selectedTime,
        setSelectedTime,
    } = props;

    const [selectedTab, setSelectedTab] = useState<number>(0);

    useEffect(() => {
        console.log(selectedTime);
    }, [selectedTime]);

    const availableHours = useMemo(() => {
        const startDate = new Date();
        startDate.setHours(9, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(21, 0, 0, 0);

        const hourDates = [];

        for (let d = new Date(startDate); d <= endDate; d.setMinutes(d.getMinutes() + 30)) {
            hourDates.push(new Date(d));
        }

        return hourDates;
    }, []);

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
                                {selectedTime.startTime.getHours()
                                    ? `${selectedTime.startTime.getHours().toString().padStart(2, '0')
                                    }:${selectedTime.startTime.getMinutes().toString().padStart(2, '0')}`
                                    : 'Выберите время'}
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
                                {selectedTime.finishTime.getHours()
                                    ? `${selectedTime.finishTime.getHours().toString().padStart(2, '0')
                                    }:${selectedTime.finishTime.getMinutes().toString().padStart(2, '0')}`
                                    : 'Выберите время'}
                            </div>
                        </div>
                    )}
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel
                    className={classes.panel}
                >
                    {availableHours
                        .filter((time) => time.getHours() !== 21)
                        .map((time) => (
                            <div
                                key={time.getMilliseconds()}
                                className={classes.timeCell}
                                onClick={() => {
                                    setSelectedTime({
                                        finishTime: new Date('Thu, 01 Jan 1970 00:00:00'),
                                        startTime: time,
                                    });
                                    setSelectedTab(1);
                                }}
                            >
                                {`${time.getHours().toString().padStart(2, '0')
                                }:${time.getMinutes().toString().padStart(2, '0')}`}
                            </div>
                        ))}
                </Tab.Panel>
                <Tab.Panel
                    className={classes.panel}
                >
                    {availableHours
                        .filter(
                            (_, index) => index > availableHours
                                .indexOf(selectedTime.startTime),
                        )
                        .map((time) => (
                            <div
                                key={time.getMilliseconds()}
                                className={classes.timeCell}
                                onClick={() => {
                                    setSelectedTime({
                                        ...selectedTime, finishTime: time,
                                    });
                                }}
                            >
                                {`${time.getHours().toString().padStart(2, '0')
                                }:${time.getMinutes().toString().padStart(2, '0')}`}
                            </div>
                        ))}
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
});
