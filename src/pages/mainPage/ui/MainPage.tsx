import { Page } from 'widgets/Page/Page';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { ListBox } from 'shared/UI/ListBox';
import {
    ChangeEvent, ReactNode, useCallback, useEffect, useState,
} from 'react';
import { Input } from 'shared/UI/Input';
import { Combobox } from 'shared/UI/Combobox';

const items = [
    { id: 1, name: 'Андрей' },
    { id: 2, name: 'Алеша' },
    { id: 3, name: 'Ольга' },
    { id: 4, name: 'Олеся' },
    { id: 5, name: 'Макар' },
];

interface IUser {
    value: string;
    content: ReactNode;
}

const MainPage = () => {
    const [value, setValue] = useState<string>('');
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');

    const fetchUsers = useCallback(
        (username: string) => {
            fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${username}`)
                .then((res) => res.json())
                .then((res) => {
                    setUsers(res.map((item: any) => ({
                        value: item.title, content: item.title,
                    })));
                });

            // return (username === ''
            //     ?
            //     : setUsers(
            //         items.filter((
            //             item,
            //         ) => item.name.toLowerCase().includes(username.toLowerCase()))
            //             .map((user) => ({
            //                 value: user.name, content: user.name,
            //             })),
            //     )
            // );
        },
        [],
    );

    return (
        <Page>
            <h1>
                ГЛАВНАЯ СТРАНИЦА
            </h1>
            <VStack max gap="32">
                <HStack max gap="16">
                    <Button>Кнопка primary</Button>
                    <Button variant="success">Кнопка success</Button>
                    <Button variant="warning">Кнопка warning</Button>
                    <Button variant="danger">Кнопка danger</Button>
                    <Button disabled variant="danger">Кнопка danger disabled</Button>
                </HStack>
                <HStack max gap="16">
                    <Button variant="primary-outline">Кнопка primary</Button>
                    <Button variant="success-outline">Кнопка success</Button>
                    <Button variant="warning-outline">Кнопка warning</Button>
                    <Button variant="danger-outline">Кнопка danger</Button>
                    <Button disabled variant="danger-outline">Кнопка danger disabled</Button>
                </HStack>
                <HStack max>
                    <ListBox
                        onChange={(e) => setValue(e)}
                        defaultValue="Выберите значение"
                        value={value}
                        items={[
                            { value: '1 hello world', content: '1 hello world' },
                            { value: '2 hello world', content: '2 hello world' },
                            { value: '3 hello world', content: '3 hello world' },
                        ]}
                    />
                </HStack>
                <HStack max>
                    <Input
                        value={value}
                        onChange={setValue}
                        placeholder="Введите что-нибудь"
                    />
                </HStack>
                <HStack max>
                    <Combobox
                        value={selectedUser}
                        onChange={setSelectedUser}
                        onChangeInput={fetchUsers}
                        placeholder="Выберите из списка"
                        items={users}
                        defaultValue="Выберите из списка"
                        showLength
                    />
                </HStack>
            </VStack>
        </Page>
    );
};

export default MainPage;
