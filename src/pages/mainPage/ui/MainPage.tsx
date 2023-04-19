import { Page } from 'widgets/Page/Page';
import { HStack, VStack } from 'shared/UI/Stack';
import {
    ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import Calendar from '@demark-pro/react-booking-calendar';
import { ru } from 'date-fns/locale';
import { Disclosure, DisclosureItems } from 'shared/UI/Disclosure';
import { SelectedTime, Timepicker } from 'shared/UI/Timepicker';

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
const availableTime: Date[] = [
    new Date('Thu, 01 Jan 1970 09:00:00'),
    new Date('Thu, 01 Jan 1970 10:00:00'),
    new Date('Thu, 01 Jan 1970 11:00:00'),
    new Date('Thu, 01 Jan 1970 12:00:00'),
    new Date('Thu, 01 Jan 1970 13:00:00'),
    new Date('Thu, 01 Jan 1970 14:00:00'),
    new Date('Thu, 01 Jan 1970 15:00:00'),
    new Date('Thu, 01 Jan 1970 16:00:00'),
    new Date('Thu, 01 Jan 1970 17:00:00'),
    new Date('Thu, 01 Jan 1970 18:00:00'),
    new Date('Thu, 01 Jan 1970 19:00:00'),
    new Date('Thu, 01 Jan 1970 20:00:00'),
    new Date('Thu, 01 Jan 1970 21:00:00'),
];

interface RenderDateProps {
    // eslint-disable-next-line react/no-unused-prop-types
    startDate?: Date;
    // eslint-disable-next-line react/no-unused-prop-types
    endDate?: Date;
}

const MainPage = () => {
    const [value, setValue] = useState<string>('');
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [start, startRef] = useState(null);
    const [end, endRef] = useState(null);
    const [selectedTime, setSelectedTime] = useState<SelectedTime>({
        finishTime: new Date('Thu, 01 Jan 1970 00:00:00'),
        startTime: new Date('Thu, 01 Jan 1970 00:00:00'),
    });

    useEffect(() => {
        console.warn(selectedTime);
    }, [selectedTime]);

    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const renderBookedDays = useCallback(({ startDate, endDate }: RenderDateProps) => {
        if (!startDate || !endDate) {
            return null;
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
    }, [selectedTime]);
    const handleChange = (e: any) => {
        setSelectedDates(e);
    };

    const fetchUsers = useCallback(
        (username: string) => {
            fetch(
                // eslint-disable-next-line max-len
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

    const disclosureItems = useMemo<DisclosureItems[]>(() => [
        {
            title: 'Вопрос 1',
            content: 'Ответ на вопрос 1. Очень длинный ответ',
        },
        {
            title: 'Вопрос 2',
            content: 'Ответ на вопрос 2. Очень длинный ответ',
        },
        {
            title: 'Вопрос 3',
            content: 'Ответ на вопрос 3. Очень длинный ответ',
        },
    ], []);

    return (
        <Page>
            <h1>
                ГЛАВНАЯ СТРАНИЦА
            </h1>
            <VStack max gap="32">
                {/* <HStack max gap="16"> */}
                {/*    <Button>Кнопка primary</Button> */}
                {/*    <Button variant="success">Кнопка success</Button> */}
                {/*    <Button variant="warning">Кнопка warning</Button> */}
                {/*    <Button variant="danger">Кнопка danger</Button> */}
                {/*    <Button disabled variant="danger">Кнопка danger disabled</Button> */}
                {/* </HStack> */}
                {/* <HStack max gap="16"> */}
                {/*    <Button variant="primary-outline">Кнопка primary</Button> */}
                {/*    <Button variant="success-outline">Кнопка success</Button> */}
                {/*    <Button variant="warning-outline">Кнопка warning</Button> */}
                {/*    <Button variant="danger-outline">Кнопка danger</Button> */}
                {/*    <Button disabled variant="danger-outline">Кнопка danger disabled</Button> */}
                {/* </HStack> */}
                {/* <HStack max> */}
                {/*    <ListBox */}
                {/*        onChange={(e) => setValue(e)} */}
                {/*        defaultValue="Выберите значение" */}
                {/*        value={value} */}
                {/*        items={[ */}
                {/*            { value: '1 hello world', content: '1 hello world' }, */}
                {/*            { value: '2 hello world', content: '2 hello world' }, */}
                {/*            { value: '3 hello world', content: '3 hello world' }, */}
                {/*        ]} */}
                {/*    /> */}
                {/* </HStack> */}
                {/* <HStack max> */}
                {/*    <Input */}
                {/*        value={value} */}
                {/*        onChange={setValue} */}
                {/*        placeholder="Введите что-нибудь" */}
                {/*    /> */}
                {/* </HStack> */}
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
                <Timepicker
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                />
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
                        range
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
