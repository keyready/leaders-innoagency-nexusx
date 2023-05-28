import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, FormEvent, memo, useCallback, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { YupInput } from 'widgets/YupInput';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { Button } from 'shared/UI/Button';
import { Input } from 'shared/UI/Input';
import { HStack, VStack } from 'shared/UI/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createPlatform } from 'pages/OwnerPanelPage/model/services/createPlatform';
import classes from './CreatePlatform.module.scss';

interface CreatePlatformProps {
    className?: string;
}

export const CreatePlatform = memo((props: CreatePlatformProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('OwnerPage');
    const dispatch = useAppDispatch();

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

    const createPlatformHandler = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (!files) return;

        for (let i = 0; i < files.length; i += 1) {
            formData.append(`platformImage_${i}`, files[i]);
        }

        for (let i = 0; i < files.length; i += 1) {
            formData.delete('images');
        }

        const result = await dispatch(createPlatform(formData));
        if (result.meta.requestStatus === 'fulfilled') {
            alert(t('Платформа создана') as string);
            setValue('title', '');
            setValue('webAddress', '');
            setValue('address', '');
            setValue('maxGuests', '');
        } else {
            alert(t('Произошла ошибка') as string);
            setValue('title', '');
            setValue('webAddress', '');
            setValue('address', '');
            setValue('maxGuests', '');
        }
    }, [dispatch, files, setValue, t]);

    return (
        <>
            <form
                encType="multipart/form-data"
                onSubmit={createPlatformHandler}
                style={{ display: 'flex', flexDirection: 'column', gap: 50 }}
            >
                <YupInput
                    setValue={setValue}
                    watch={watch}
                    // @ts-ignore
                    errors={errors}
                    register={register}
                    name="title"
                    type="text"
                    placeholder="Введите название"
                />
                <YupInput
                    setValue={setValue}
                    watch={watch}
                    // @ts-ignore
                    errors={errors}
                    register={register}
                    name="webAddress"
                    type="text"
                    placeholder="Введите сайт"
                />
                <YupInput
                    setValue={setValue}
                    watch={watch}
                    // @ts-ignore
                    errors={errors}
                    register={register}
                    name="address"
                    type="text"
                    placeholder="Введите адрес"
                />
                <YupInput
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
                <div className={classes.file_input}>
                    <input
                        className={classes.input}
                        style={{ display: 'none' }}
                        onChange={handleFileInputChanges}
                        type="file"
                        accept="image/*"
                        id="imagesUploader"
                        multiple
                        name="images"
                    />
                    <label htmlFor="imagesUploader" className={classes.AvatarUploaderLabel}>
                        {t('Загрузить изображения')}
                    </label>
                </div>
                <VStack max justify="start" align="stretch" gap="20">
                    {inputs.map((inputValue, index) => (
                        <HStack max justify="center" align="center" gap="20">
                            <Input
                                name={`restriction_${index}`}
                                placeholder="Введите ограничение"
                                key={index}
                                value={inputValue}
                                onChange={(value) => handleInputChange(index, value)}
                            />
                            <Button
                                type="button"
                                variant="danger"
                                onClick={() => handleInputDelete(index)}
                            >
                                {t('Удалить')}
                            </Button>
                        </HStack>
                    ))}
                </VStack>

                <Button type="submit">{t('Создать')}</Button>
            </form>
        </>
    );
});
