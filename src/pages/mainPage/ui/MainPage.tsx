import { Page } from 'widgets/Page/Page';
import { Input } from 'shared/UI/Input';
import { useState } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { Paginator } from 'shared/UI/Paginator';
import { Card, CardSize } from 'shared/UI/Card/Card';
import { Icon } from 'shared/UI/Icon/Icon';
import BagIcon from 'shared/assets/icons/bag.svg';
import { Text } from 'shared/UI/Text';
import classes from './MainPage.module.scss';

const MainPage = () => {
    const [value, setValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    return (
        <Page>
            <VStack>
                <h1>Lorem ipsum dolor sit amet.</h1>
                <h2>Lorem ipsum dolor sit amet.</h2>
                <h3>Lorem ipsum dolor sit amet.</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quae quas sit! Aperiam at eveniet inventore nihil quos repudiandae. Dolorum ducimus earum, fuga in quo recusandae tempore veritatis vero voluptate?</p>
            </VStack>
            <br />
            <br />
            <VStack>
                <h1>Инпуты</h1>
                <Input
                    value={value}
                    onChange={setValue}
                    placeholder="Поиск"
                />
                <Input
                    inputType="search"
                    value={value}
                    onChange={setValue}
                    placeholder="Поиск"
                />
                <Input
                    inputType="password"
                    value={value}
                    onChange={setValue}
                    placeholder="Поиск"
                />
            </VStack>
            <br />
            <br />
            <VStack>
                <h1>Кнопочки</h1>
                <HStack max>
                    <Button>Привет мир</Button>
                    <Button variant="primary-outline">Привет мир</Button>
                </HStack>
            </VStack>
            <br />
            <br />
            <VStack>
                <h1>Пагинатор</h1>
                <Paginator
                    currentPage={page}
                    setCurrentPage={setPage}
                    maxPages={10}
                />
            </VStack>
            <br />
            <br />
            <VStack>
                <h1>Карточки</h1>
                <HStack max gap="32">
                    <Card
                        size={CardSize.EXPAND}
                    >
                        <Icon Svg={BagIcon} className={classes.icon} />
                        <h1>Название</h1>
                    </Card>
                    <Card>
                        <Icon Svg={BagIcon} className={classes.icon} />
                        <Text
                            title="Название"
                            text="Краткое описание преимущества сервиса перед другими"
                        />
                    </Card>
                </HStack>
            </VStack>
        </Page>
    );
};

export default MainPage;
