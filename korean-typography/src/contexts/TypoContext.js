import React, { createContext, useEffect, useState } from "react";


const TypoContext = createContext();

export const TypoProvider = ({ children }) => {
    const initialFontStyle = { family: '나눔고딕', size: '20px', color: 'white' }
    const initialImg = { url: `${process.env.PUBLIC_URL}/images/testImg.png`, type: 'yupmoon', textBackgroudColor: '#ffffff' }

    const fontStyle = JSON.parse(sessionStorage.getItem('fontStyle'));
    const img = JSON.parse(sessionStorage.getItem('img'));
    useEffect(() => {
        if (!fontStyle) {
            sessionStorage.setItem('fontStyle', JSON.stringify(initialFontStyle));
        }
        if (!img) {
            sessionStorage.setItem('img', JSON.stringify(initialImg));
        }
    }, [])
    const [data, setData] = useState(
        {
            imgUrl: img ? img.url : `${process.env.PUBLIC_URL}/images/testImg.png`,
            imgType: img ? img.type : 'yupmoon',
            replace: false,
            inputText: "",
            textBackgroudColor: img ? img.textBackgroudColor : '#ffffff',
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