import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent,
    FormEvent, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { Input } from 'shared/UI/Input';
import { useForm } from 'react-hook-form';
import classes from './OwnerPanelPage.module.scss';

interface OwnerPanelPageProps {
    className?: string;
}

const reducers: ReducersList = {

};

const OwnerPanelPage = memo((props: OwnerPanelPageProps) => {
    const { className } = props;

    const { t } = useTranslation();
    const {
        setValue, watch, formState: { errors }, register,
    } = useForm();

    const [inputs, setInputs] = useState<string[]>(['']);
    const [files, setFiles] = useState<FileList | null>(null);

    const handleFileInputChanges = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        setFiles(files);
    }, []);

    const handleInputChange = (index: number, value: string) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = value;
        setInputs(updatedInputs);

        if (index === inputs.length - 1 && value !== '') {
            // Добавляем новый инпут, если текущий последний и не пустой
            setInputs([...updatedInputs, '']);
        }
    };
    const handleInputDelete = (index: number) => {
        const filteredInputs = inputs.filter((_, i) => i !== index);
        setInputs(filteredInputs);
    };

    const createPlatform = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (!files) return;

        for (let i = 0; i < files.length; i += 1) {
            formData.append(`platformImage_${i}`, files[i]);
        }

        for (let i = 0; i < files.length; i += 1) {
            formData.delete('images');
        }

        fetch('/', {
            method: 'post',
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => console.log(res));
    }, [files]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.OwnerPanelPage, {}, [className])}>
                <h2>Страница арендодателя</h2>
                <form
                    encType="multipart/form-data"
                    onSubmit={createPlatform}
                    style={{ display: 'flex', flexDirection: 'column', gap: 50 }}
                >
                    <Input
                        setValue={setValue}
                        watch={watch}
                        // @ts-ignore
                        errors={errors}
                        register={register}
                        name="title"
                        type="text"
                        placeholder="Введите название"
                    />
                    <Input
                        setValue={setValue}
                        watch={watch}
                        // @ts-ignore
                        errors={errors}
                        register={register}
                        name="address"
                        type="text"
                        placeholder="Введите адрес"
                    />
                    <Input
                        setValue={setValue}
                        watch={watch}
                        // @ts-ignore
                        errors={errors}
                        register={register}
                        name="maxGuests"
                        type="text"
                        placeholder="Введите количество мест"
                    />
                    <TextArea
                        name="description"
                        placeholder="Введите описание"
                    />
                    <input
                        onChange={handleFileInputChanges}
                        name="images"
                        type="file"
                        multiple
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: 10 }}>
                        {inputs.map((inputValue, index) => (
                            <div>
                                <input
                                    name={`restriction_${index}`}
                                    placeholder="Введите ограничение"
                                    key={index}
                                    value={inputValue}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleInputDelete(index)}
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}
                    </div>

                    <button>Создать</button>
                </form>
            </Page>
        </DynamicModuleLoader>
    );
});

export default OwnerPanelPage;
