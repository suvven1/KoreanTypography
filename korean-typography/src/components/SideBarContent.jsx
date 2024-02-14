import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import SelectImg from './SelectImg'
import { TypoContext } from '../contexts/TypoContext'
const typo = require('../utils/typography')
const SideBarContent = ({ close }) => {
    const typoData = useContext(TypoContext);
    const [inputText, setInputText] = useState("")
    const replaceBox = () => {
        close(true)
        setTimeout(() => {
            typoData.replace = true;
            typoData.inputText = inputText;
            localStorage.setItem('typoData', JSON.stringify(typoData))
            window.location.replace('/')
        }, 500)
    }
    const [selectOpen, setSelectOpen] = useState(false)
    const openSelectImg = () => {
        setSelectOpen(!selectOpen)
    }

    return (
        <Contents>
            {selectOpen ? <SelectImg close={close} setSelectOpen={setSelectOpen} /> :
                <textarea cols="25" rows="19" placeholder='텍스트를 입력해주세요.' onChange={(e) => { setInputText(e.target.value) }}></textarea>
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

    & textarea{
        height: 400px;
        padding: 10px;
        font-size: 20px;
        resize: none;
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
