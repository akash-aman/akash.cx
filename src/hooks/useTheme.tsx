import { useState, useEffect } from "react";
import vibrate from "hooks/vibrate";

interface ThemeProps {
    onClick: () => void;
}

const useTheme = (relyOnState?: boolean): [ThemeProps, boolean] => {
    const [themeState, setThemeState] = useState(false);
    useEffect(() => { }, []);

    const Change = () => {
        vibrate();
        document.documentElement.classList.toggle("dark");
        document.documentElement.classList.contains("dark")
            ? localStorage.setItem("theme", "dark")
            : localStorage.setItem("theme", "light");
        if (relyOnState) {
            document.documentElement.classList.contains("dark")
                ? setThemeState(false)
                : setThemeState(true);
        }
    };

    let props = {
        onClick: () => Change(),
    };

    if (relyOnState) {
        return [props, themeState];
    }
    return [props, false];
};

export default useTheme;
