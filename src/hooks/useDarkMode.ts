import { useState, useEffect } from "react"

type DarkModeState = 'light' | 'dark';

function useDarkMode(){
    const preferDarkQuery = '(prefers-color-scheme: dark)';

    const [theme, setTheme] = useState<DarkModeState>(() => {
            if(typeof window != 'undefined'){
                const isVal = window.localStorage.getItem('theme');
                if(isVal){
                    return isVal == 'dark' ? 'dark' : 'light';
                }else{
                    return window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light';
                }
            }else {
                return 'dark';
            }
        }
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkQuery);
        const handleChange = () => {
            setTheme(mediaQuery.matches ? 'dark' : 'light')
        }
        mediaQuery.addEventListener('change', handleChange);
        return() => mediaQuery.removeEventListener('change', handleChange)
    }, [])
    
    useEffect(() => {
        const colorScheme = theme == 'dark' ? 'light' : 'dark';
        const root = window.document.documentElement;

        root.classList.remove(colorScheme);
        root.classList.add(theme);
        
        if(typeof window != 'undefined'){
            localStorage.setItem("theme", theme);
        }

    }, [theme])

    return [theme, setTheme] as const;
    
}

export default useDarkMode;