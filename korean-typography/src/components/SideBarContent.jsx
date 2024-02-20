import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import SelectImg from './SelectImg'
import TypoContext from '../contexts/TypoContext'
const SideBarContent = ({ closeInput }) => {
    const [fontStyle, setFontStyle] = useState(JSON.parse(sessionStorage.getItem('fontStyle')));
    const { data, update } = useContext(TypoContext)
    const [inputText, setInputText] = useState("")
    const [selectOpen, setSelectOpen] = useState(false)

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

    // 이미지 선택창 열고 닫기
    const openSelectImg = () => {
        setSelectOpen(!selectOpen)
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
        <Contents fontFamily={fontStyle?.family} fontSize={fontStyle?.size} color={fontStyle?.color}>
            {selectOpen ? <SelectImg closeInput={closeInput} setSelectOpen={setSelectOpen} setInputText={setInputText} /> :
                <>
                    <FontStyle fontFamily={fontStyle?.family}>
                        <div>글꼴</div>
                        <select id="fontFamilyList" value={fontStyle?.family} onChange={(e) => changeFontStyle(e.target.value, "family")}>
                            <option value="나눔고딕">나눔고딕</option>
                            <option value="나눔손글씨 펜">나눔손글씨</option>
                            <option value="배달의민족 기랑해랑">배달의민족</option>
                            <option value="필기체">필기체</option>
                        </select>
                        <div> 색상</div>
                        <select id="fontSizeList" value={fontStyle?.size} onChange={(e) => changeFontStyle(e.target.value, 'size')}>
                            <option value="25px">25px</option>
                            <option value="30px">30px</option>
                            <option value="35px">35px</option>
                            <option value="40px">40px</option>
                        </select>
                        <div> 크기</div>
                        <select id="fontColorList" value={fontStyle?.color} onChange={(e) => changeFontStyle(e.target.value, 'color')}>
                            <option value="white">흰색</option>
                            <option value="black">검정색</option>
                            <option value="blue">파란색</option>
                            <option value="red">빨간색</option>
                        </select>
                    </FontStyle>
                    <textarea cols="25" rows="19" placeholder='텍스트를 입력해주세요.' onChange={(e) => { setInputText(e.target.value) }}></textarea>
                </>
            }
            <div className='btnBox'>
                <button onClick={openSelectImg}>{selectOpen ? '이전' : '사진선택'}</button>
                <button onClick={replaceBox} disabled={selectOpen}>시작</button>
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
    justify-content: end;
    position: relative;
    font-family: ${props => props.fontFamily};
    & textarea{
        width: 310px;
        height: 400px;
        padding: 10px;
        font-size: ${props => props.fontSize};
        color: ${props => props.color};
        background-color: #BDBDBD;
        border-radius: 10px;
        resize: none;
        font-family: inherit;
    }

    & textarea::placeholder{
        color: ${props => props.color};
    }

    & .btnBox{
        /* justify-self:end; */
        & button{
            width: 150px;
            height: 60px;
            border-radius: 10px;
            font-size: 20px;
            margin : 50px 20px 100px 20px;
            cursor: pointer;
        }

        & button:hover{
            background-color: #BDBDBD;
        }
    }
`

const FontStyle = styled.div`
    display: flex;
    width: 340px;
    justify-content: space-around;
    margin-bottom: 20px;
    font-family: '나눔고딕';
    font-weight: bold;
    select{
        margin-left: -15px;
    }
`
