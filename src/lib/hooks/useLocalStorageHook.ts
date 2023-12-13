import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>]{
    
    const readValue = useCallback(():T => {
        if(typeof window == 'undefined'){
            return initialValue;
        }

        try{
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        }catch(error){
            return initialValue;
        }

    }, [initialValue, key])

    const [storedValue, setStoredValue] = useState<T>(initialValue);
    
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

    const setValue: SetValue<T> = useCallback(value => {
        if(typeof window === 'undefined'){
            return;
        }

        const valueToStore = value instanceof Function ? value(storedValue) : value;
        if(valueToStore !== storedValue){
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
    }, [storedValue, key])

    return [storedValue, setValue]
}