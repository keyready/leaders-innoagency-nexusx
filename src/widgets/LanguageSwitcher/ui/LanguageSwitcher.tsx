import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Select, SelectItem } from 'shared/UI/Select/Select';

export const LanguageSwitcher = memo(() => {
    const { t, i18n } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState<SelectItem>({
        value: i18n.language,
        content: t(i18n.language),
    });
    const handleChangeLanguage = useCallback(async (newLanguage: SelectItem) => {
        await i18n.changeLanguage(newLanguage.value);
        setSelectedLanguage({
            value: i18n.language,
            content: t(i18n.language),
        });
    }, [i18n, t]);

    return (
        <Select
            items={[
                {
                    value: 'ru',
                    content: t('ru'),
                },
                {
                    value: 'en',
                    content: t('en'),
                },
                {
                    value: 'es',
                    content: t('es'),
                },
            ]}
            selectedValue={selectedLanguage}
            setSelectedValue={handleChangeLanguage}
        />
    );
});
