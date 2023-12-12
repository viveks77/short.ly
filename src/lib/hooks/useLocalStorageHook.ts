import { useCallback, useEffect, useMemo, useState } from "react";

export function useLocalStorage(key: string, initialValue: any){
    
    const readValue = useCallback(() => {
        if(typeof window == 'undefined'){
            return initialValue;
        }

        try{
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }catch(error){
            return initialValue;
        }

    }, [initialValue, key])

    const [storedValue, setStoredValue] = useState(initialValue);
    
    useEffect(() => {
        setStoredValue(readValue());
    }, [])

    const changeHandler = useCallback((event: StorageEvent ) => {
        const {key: changeKey} = event;
        if(key === changeKey){
            setStoredValue(readValue());
        }
    }, [key, readValue])

    useEffect(() => {
        window.addEventListener('storage', changeHandler);

        return () => window.removeEventListener('storage', changeHandler);
    }, [])

    return useMemo(() => {
        const setValue = (value:any) => {
            if(typeof window === 'undefined'){
                return;
            }

            const valueToStore = value instanceof Function ? value(storedValue) : value;
            if(valueToStore !== storedValue){
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        }
        return [storedValue, setValue];
    }, [storedValue, key])

}