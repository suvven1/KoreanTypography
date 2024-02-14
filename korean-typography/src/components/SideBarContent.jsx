import React, { useState } from 'react'
import styled from 'styled-components'

const SideBarContent = ({ setReplaceState, close }) => {
    const [inputText, setInputText] = useState("")
    const replaceBox = () => {
        close(true)
        setTimeout(() => {
            setReplaceState(inputText)
        }, 500)
    }
    return (
        <Contents>
            <textarea cols="25" rows="19" placeholder='텍스트를 입력해주세요.' onChange={(e) => { setInputText(e.target.value) }}></textarea>
            <div className='btnBox'>
                <button >업로드</button>
                <button onClick={replaceBox}>시작</button>
            </div>

            {/* <div style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 'bold', alignSelf: 'start' }}>입력</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input type="text" value={textTest} onChange={(e) => { setTextTest(e.target.value) }} style={{ width: "320px", height: "30px", paddingLeft: '10px', fontSize: '20px' }} />
                <button onClick={textDestroy} style={{ width: "70px", height: "35px", margin: '0 0 30px 10px', fontSize: '18px' }}>추출</button>
            </div>
            <div style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 'bold', alignSelf: 'start' }}>출력</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '325px', height: "35px", border: "1px solid black", paddingLeft: '10px', fontSize: '20px', backgroundColor: 'white' }}>{textResult}</div>
                <button onClick={replaceBox} style={{ width: "70px", height: "35px", margin: '0 0 30px 10px', fontSize: '18px' }}>정렬</button>
            </div>


            <button onClick={() => window.location.replace('/')} style={{ width: "70px", height: "35px", margin: '20px 0 -10px 0', fontSize: '18px' }}>초기화</button> */}
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

    & textarea{
        padding: 10px;
        font-size: 20px;
        resize: none;
    }

    & .btnBox{
        justify-self:end;
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
