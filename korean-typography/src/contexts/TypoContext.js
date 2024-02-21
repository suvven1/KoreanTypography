import React, { createContext, useEffect, useState } from "react";


const TypoContext = createContext();

export const TypoProvider = ({ children }) => {
    const initialFontStyle = { family: '나눔고딕', size: '20px', color: 'white' }
    const fontStyle = JSON.parse(sessionStorage.getItem('fontStyle'));

    useEffect(() => {
        if (!fontStyle) {
            sessionStorage.setItem('fontStyle', JSON.stringify(initialFontStyle));
        }
    }, [])
    const [data, setData] = useState(
        {
            replace: false,
            inputText: "",
            fontFamily: fontStyle ? fontStyle.family : '나눔고딕',
            fontSize: fontStyle ? fontStyle.size : '20px',
            fontColor: fontStyle ? fontStyle.color : 'white'
        }
    );

    const update = (newData) => {
        setData(newData);
    };

    return (
        <TypoContext.Provider value={{ data, update }}>
            {children}
        </TypoContext.Provider>
    );
};

export default TypoContext;