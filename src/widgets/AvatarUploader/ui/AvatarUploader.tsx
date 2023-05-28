import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, memo, useCallback, useRef, useState,
} from 'react';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Button } from 'shared/UI/Button';
import { Card } from 'shared/UI/Card/Card';
import { HStack, VStack } from 'shared/UI/Stack';
import classes from './AvatarUploader.module.scss';

interface AvatarUploaderProps {
    className?: string;
    image: string;
    width?: number;
    height?: number;
    border?: number;
    color?: number[];
}

export const AvatarUploader = memo((props: AvatarUploaderProps) => {
    const {
        className,
        image,
        color = [154, 187, 236],
        height = 250,
        width = 250,
        border = 2,
    } = props;

    const { t } = useTranslation();

    const [previewUrl, setPreviewUrl] = useState<string>('');

    const [avatarZoom, setAvatarZoom] = useState<number>(1);
    const [avatarBorderRadius, setAvatarBorderRadius] = useState<number>(0);
    const [avatarRotation, setAvatarRotation] = useState<number>(0);

    const editorRef = useRef<AvatarEditor>(null);

    const avatarZoomHandler = useCallback((zoom: number) => {
        if (zoom < 1) setAvatarZoom(1);
        else if (zoom > 10) setAvatarZoom(10);
        else setAvatarZoom(zoom);
    }, []);
    const avatarBorderRadiusHandler = useCallback((radius: number) => {
        if (radius < 0) setAvatarBorderRadius(0);
        else if (radius > 100) setAvatarBorderRadius(100);
        else setAvatarBorderRadius(radius);
    }, []);
    const avatarRotationHandler = useCallback((rotation: number) => {
        if (rotation < -180) setAvatarRotation(-180);
        else if (rotation > 180) setAvatarRotation(180);
        else setAvatarRotation(rotation);
    }, []);
    const handleSave = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImage();

            canvas.toBlob((blob) => {
                if (blob) {
                    // Создать объект FormData и добавить изображение
                    const formData = new FormData();
                    formData.append('avatar', blob, 'avatar.png');

                    fetch('/uploadAvatar', {
                        method: 'post',
                        body: formData,
                    });
                }
            });
        }
    };

    const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    return (
        <Card className={classNames(classes.AvatarUploader, {}, [className])}>
            <VStack justify="between" align="center" className={classes.wrapperWrapper}>
                <HStack
                    justify="center"
                    gap="32"
                    max
                    className={classes.wrapper}
                >
                    <VStack>
                        <AvatarEditor
                            image={previewUrl || image}
                            ref={editorRef}
                            color={color}
                            width={width}
                            height={height}
                            border={border}
                            borderRadius={avatarBorderRadius}
                            scale={avatarZoom}
                            rotate={avatarRotation}
                        />
                        <div className={classes.file_input}>
                            <input
                                className={classes.input}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                type="file"
                                accept="image/*"
                                id="avatarUploader"
                            />
                            <label htmlFor="avatarUploader" className={classes.AvatarUploaderLabel}>
                                {t('Изменить аватар')}
                            </label>
                        </div>
                        <h4 style={{ marginTop: 30, textAlign: 'center', width: '100%' }}>
                            {t('Увеличение')}
                        </h4>
                        <Slider
                            defaultValue={avatarZoom}
                            trackStyle={{ backgroundColor: '#9ABBEC', height: 10 }}
                            handleStyle={{
                                borderColor: '#9ABBEC',
                                height: 20,
                                width: 20,
                                marginLeft: -7,
                                backgroundColor: '#6196E4',
                            }}
                            railStyle={{ backgroundColor: '#B7B8B9', height: 10 }}
                            min={1}
                            step={0.5}
                            max={10}
                            onChange={(zoom) => avatarZoomHandler(zoom as number)}
                        />
                    </VStack>
                </HStack>
                <Button style={{ marginTop: 30 }} onClick={handleSave}>
                    {t('Сохранить')}
                </Button>
            </VStack>
        </Card>
    );
});
