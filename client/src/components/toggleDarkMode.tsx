/* 
    Toggle switch for dark mode
*/

import Switch from 'react-switch';
import { useDarkMode } from '../hooks/useDarkMode';

interface Props {
    className?: string;
}

export default function ToggleDarkMode({ className }: Props) {
    const [isDark, setIsDark] = useDarkMode();

    return (
        <Switch
            id='toggleDarkmodeSwitch'
            onChange={(checked) => {
                setIsDark(checked);
            }}
            height={36}
            width={74}
            handleDiameter={34}
            checked={isDark}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor={'#252525'}
            onHandleColor={'#E6004E'}
            className={className}
        />
    );
}
