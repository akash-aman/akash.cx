import { useState, useEffect, useRef, Dispatch, SetStateAction, RefObject } from "react";

/**
 * Hook to capture keyboard press events.
 *
 * @param {boolean} initialState : initial state of the component
 * @param {string} key 			 : key pressed with ctrl key
 * @returns {array} 			 : [show, setShow, props]
 */
const useKeyboard = (
    initialState: boolean,
    key: string,
): [
        boolean,
        Dispatch<SetStateAction<boolean>>,
        {
            ref: RefObject<HTMLButtonElement | null>;
            style: { display: string };
            onClick: () => void;
        },
    ] => {
    const [show, setShow] = useState<boolean>(initialState);
    const toggleButton = useRef<HTMLButtonElement>(null);

    const listenKeyPress = (e: KeyboardEvent) => {
        if (e.code === key && e.ctrlKey) {
            e.preventDefault();
            toggleButton?.current?.click();
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.getItem("key") === "true" && setShow(true);
            document?.addEventListener("keydown", listenKeyPress, true);
        }
        return () => {
            if (typeof window !== "undefined") {
                document?.removeEventListener("keydown", listenKeyPress, true);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const props = {
        ref: toggleButton,
        style: { display: "none" },
        onClick: () => {
            setShow(!show);
            localStorage.setItem("key", `${!show}`);
        },
    };

    return [show, setShow, props];
};

export default useKeyboard;
