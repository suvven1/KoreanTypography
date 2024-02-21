import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import SelectImg from './SelectImg'
import TypoContext from '../contexts/TypoContext'
const SideBarContent = ({ closeInput }) => {
    const [fontStyle, setFontStyle] = useState(JSON.parse(sessionStorage.getItem('fontStyle')));
    const { data, update } = useContext(TypoContext)
    const [inputText, setInputText] = useState("")

    // 입력한 텍스트 분해 및 이동 시작
    const replaceBox = () => {
        closeInput(true)
        setTimeout(() => {
            update({
                ...data,
                replace: true,
                inputText: inputText
            })
        }, 500)
    }

    // 글씨 스타일 변경
    const changeFontStyle = (style, type) => {
        update({
            ...data,
            [type]: style
        })
        const newFontStyle = {
            ...fontStyle,
            [type]: style
        }
        setFontStyle(newFontStyle)
        sessionStorage.setItem('fontStyle', JSON.stringify(newFontStyle))
    }

    return (
        <Contents fontFamily={fontStyle ? fontStyle.family : data.fontFamily} fontSize={fontStyle ? fontStyle.size : data.fontSize} color={fontStyle ? fontStyle.color : data.fontColor}>
            <FontStyle fontFamily={fontStyle?.family}>
                <div className='select-box'>
                    <div>글꼴</div>
                    <select id="fontFamilyList" value={fontStyle?.family} onChange={(e) => changeFontStyle(e.target.value, "family")}>
                        <option value="나눔고딕">나눔고딕</option>
                        <option value="나눔손글씨 펜">나눔손글씨</option>
                        <option value="배달의민족 기랑해랑">배달의민족</option>
                        <option value="필기체">필기체</option>
                    </select>
                </div>
                <div className='select-box'>
                    <div>크기</div>
                    <select id="fontSizeList" value={fontStyle?.size} onChange={(e) => changeFontStyle(e.target.value, 'size')}>
                        <option value="25px">25px</option>
                        <option value="30px">30px</option>
                        <option value="35px">35px</option>
                        <option value="40px">40px</option>
                    </select>
                </div>
                <div className='select-box'>
                    <div>색상</div>
                    <select id="fontColorList" value={fontStyle?.color} onChange={(e) => changeFontStyle(e.target.value, 'color')}>
                        <option value="white">흰색</option>
                        <option value="black">검정색</option>
                        <option value="blue">파란색</option>
                        <option value="red">빨간색</option>
                    </select>
                </div>
            </FontStyle>
            <textarea cols="25" rows="19" placeholder='텍스트를 입력해주세요.' onChange={(e) => { setInputText(e.target.value) }}></textarea>
            <div className='btnBox'>
                <button onClick={replaceBox} >시 작</button>
            </div>
        </Contents>
    )
}

export default SideBarContent

const Contents = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    justify-content: center;
    position: relative;
    font-family: ${props => props.fontFamily};
    & textarea{
        width: 75%;
        height: 400px;
        padding: 10px;
        font-size: ${props => props.fontSize};
        color: ${props => props.color};
        background-color: white;
        border-radius: 10px;
        border-style: none;
        resize: none;
        font-family: inherit;
        box-shadow: 10px 10px 10px 0px gray;
    }

    & textarea::placeholder{
        color: ${props => props.color};
    }

    & textarea:focus{
        outline: none;
    }

    & .btnBox{
        display: flex;
        justify-content: center;
        width: 78%;
        & button{
            width: 100%;
            height: 50px;
            border-radius: 10px;
            font-size: 20px;
            margin : 30px 0px 0px 0px;
            background-color: cornflowerblue;
            color: white;
            border-style: none;
            box-shadow: 5px 5px 5px 0px gray;
            cursor: pointer;
        }

        & button:active{
            background-color: white;
            color: cornflowerblue;
        }
    }
`

const FontStyle = styled.div`
    display: flex;
    width: 75%;
    /* justify-content: space-around; */
    margin-bottom: 30px;
    font-family: '나눔고딕';
    font-weight: bold;
    font-size: 18px;

    & .select-box{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        height: 25px;
        width: 40%;
    }

    select{
        font-size: 15px;
        border-radius: 5px;
        height: 30px;
        width: 50%;
    }
`
