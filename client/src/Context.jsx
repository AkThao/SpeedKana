import { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [characterSet, setCharacterSet] = useState({
        // Default character set is basic Hiragana
        "hiragana": true,
        "hiraganaDiacritics": false,
        "hiraganaDigraphs": false,
        "katakana": false,
        "katakanaDiacritics": false,
        "katakanaDigraphs": false,
    })
    const [isCharsetErrMsgOpen, setIsCharsetErrMsgOpen] = useState(false);

    const updateCharacterSet = (nameIdx) => {
        setCharacterSet((prev) => {
            let newCharacterSet = { ...prev };
            newCharacterSet[nameIdx] = !prev[nameIdx];
            if (!Object.values(newCharacterSet).includes(true)) {  // Do not allow empty selection
                setIsCharsetErrMsgOpen(true);
                return prev;
            } else {
                return newCharacterSet;
            }
        })
    }

    return (
        <AppContext.Provider
            value={{
                characterSet,
                updateCharacterSet,
                isCharsetErrMsgOpen,
                setIsCharsetErrMsgOpen,
            }}
        >
            {children}
        </AppContext.Provider>
    )
};