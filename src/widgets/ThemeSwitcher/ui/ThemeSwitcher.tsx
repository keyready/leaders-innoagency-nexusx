import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { HStack } from 'shared/UI/Stack';
import { Switch } from 'shared/UI/Switch';
import LightIcon from 'shared/assets/icons/light-theme.svg';
import DarkIcon from 'shared/assets/icons/dark-theme.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import classes from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const {
        className,
    } = props;

    const { theme, toggleTheme } = useTheme();

    const [currentTheme, setCurrentTheme] = useState<boolean>(theme === Theme.DARK);

    const setCurrentThemeHandler = useCallback(() => {
        if (theme === Theme.LIGHT) setCurrentTheme(true);
        else setCurrentTheme(false);
        toggleTheme();
    }, [theme, toggleTheme]);

    return (
        <HStack
            max
            justify="between"
            align="center"
            className={classNames(classes.ThemeSwitcher, {}, [className])}
        >
            <Icon Svg={LightIcon} className={classes.icon} />
            <Switch enabled={currentTheme} setEnabled={setCurrentThemeHandler} />
            <Icon Svg={DarkIcon} className={classes.icon} />
        </HStack>
    );
});
