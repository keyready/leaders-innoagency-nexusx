import { Page } from 'widgets/Page/Page';
import { HStack, VStack } from 'shared/UI/Stack';
import {
    ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import Calendar from '@demark-pro/react-booking-calendar';
import { ru } from 'date-fns/locale';
import { Disclosure, DisclosureItems } from 'shared/UI/Disclosure';
import { SelectedTime, Timepicker } from 'shared/UI/Timepicker';
import { Switch } from 'shared/UI/Switch';
import { Card } from 'shared/UI/Card/Card';

interface IUser {
    value: string;
    content: ReactNode;
}

const reserved = [
    {
        startDate: new Date(2023, 3, 21),
        endDate: new Date(2023, 3, 23),
    },
];

interface RenderDateProps {
    startDate?: Date;
    endDate?: Date;
}

const MainPage = () => {
    const [value, setValue] = useState<string>('');
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [start, startRef] = useState(null);
    const [end, endRef] = useState(null);
    const [isHackathon, setIsHackathon] = useState<boolean>(false);
    const [isSameTimeForRange, setIsSameTimeForRange] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<SelectedTime>({
        finishTime: new Date('Thu, 01 Jan 1970 00:00:00'),
        startTime: new Date('Thu, 01 Jan 1970 00:00:00'),
    });

    useEffect(() => {
        console.warn(selectedTime);
    }, [selectedTime]);

    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const renderBookedDays = useCallback(({ startDate, endDate }: RenderDateProps) => {
        if (!startDate) {
            return null;
        }
        if (!endDate || isSameTimeForRange) {
            return (
                <Timepicker
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                />
            );
        }

        const currentDate: Date = new Date(startDate.getTime());
        const disclosureItems: DisclosureItems[] = [];

        while (currentDate <= endDate) {
            disclosureItems.push({
                title: currentDate.toLocaleDateString(),
                content: <Timepicker
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                />,
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return (
            <Disclosure
                items={disclosureItems}
            />
        );
    }, [isSameTimeForRange, selectedTime]);
    const handleChange = (e: any) => {
        setSelectedDates(e);
    };

    const fetchUsers = useCallback(
        (username: string) => {
            fetch(
                `https://jsonplaceholder.typicode.com/posts?title_like=${username}&_sort=title&_order=desc`,
            )
                .then((res) => res.json())
                .then((res) => {
                    setUsers(res.map((item: any) => ({
                        value: item.title,
                        content: (
                            <>
                                <h4>{item.userId}</h4>
                                <p>{item.title}</p>
                                <p>{item.body}</p>
                            </>
                        ),
                    })));
                });
        },
        [],
    );

    const changeModeHandler = useCallback(() => {
        setIsHackathon((prev) => !prev);
        setSelectedDates([selectedDates[0]]);
    }, [selectedDates]);

    return (
        <Page>
            <h1>
                ГЛАВНАЯ СТРАНИЦА
            </h1>
            <VStack max gap="32">
                {/* <HStack max> */}
                {/*    <Combobox */}
                {/*        value={selectedUser} */}
                {/*        onChange={setSelectedUser} */}
                {/*        onChangeInput={fetchUsers} */}
                {/*        placeholder="Выберите из списка" */}
                {/*        items={users} */}
                {/*        showLength */}
                {/*    /> */}
                {/* </HStack> */}
                <Card>
                    <VStack max gap="16">
                        <h2>Настройки</h2>
                        <HStack gap="16" max>
                            <span>У нас хакатон</span>
                            <Switch enabled={isHackathon} setEnabled={changeModeHandler} />
                        </HStack>
                        {isHackathon && (
                            <HStack gap="16" max>
                                <span>Одинаковое время</span>
                                <Switch enabled={isSameTimeForRange} setEnabled={setIsSameTimeForRange} />
                            </HStack>
                        )}
                    </VStack>
                </Card>
                <HStack gap="32">
                    <Calendar
                        style={{ width: 600 }}
                        selected={selectedDates}
                        onChange={handleChange}
                        // onOverbook={(e, err) => alert(err)}
                        disabled={(date, state) => !state.isSameMonth}
                        reserved={reserved}
                        variant="booking"
                        dateFnsOptions={{ weekStartsOn: 1, locale: ru }}
                        range={isHackathon}
                    />
                    <VStack
                        max
                        justify="start"
                        align="start"
                        style={{ background: 'red' }}
                    >
                        {renderBookedDays({
                            startDate: selectedDates[0],
                            endDate: selectedDates[1],
                        })}
                    </VStack>
                </HStack>
            </VStack>
        </Page>
    );
};

export default MainPage;
