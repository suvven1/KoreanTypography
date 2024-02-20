import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import SideBar from './SideBar';
import SideBarContent from './SideBarContent';

const Typography = ({ width, children, typoClose, closeTypo }) => {

    const [xPosition, setX] = useState(-width);

    //메뉴 닫기 함수
    const closeMenu = (e) => {
        if (e === true) {
            setX(0);
        } else if (e === 'close') {
            setX(-width);
        }
    };
    useEffect(() => {
        closeMenu(typoClose);
        closeTypo(false);
    }, [typoClose]);


    // 입력 화면 열고 닫기
    const [inputClose, setInputClose] = useState(false);
    const closeInput = (e) => {
        setInputClose(e);
    };

    return (
        <TypographyBox
            style={{
                width: `${width}%`,
                height: "100%",
                transform: `translatex(${-xPosition}%)`,
            }}
        >
            <div style={{ height: '70px' }}></div>
            {/* 사이드바 컴포넌트 내부 값이 구현되는 위치 */}
            <TypographyContent>{children}</TypographyContent>
            <div className="sideBar">
                <SideBar width={700} inputClose={inputClose} closeInput={closeInput}>
                    <SideBarContent closeInput={closeInput} />
                </SideBar>
            </div>
        </TypographyBox>
    )
}

export default Typography

const TypographyBox = styled.div`
border: 1px solid black;
  background-color: whitesmoke;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: #202020;
  height: 100%;
  z-index: 99;

  & .btnSideBar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    margin: 15px 0 0 15px;
    width: 50px;
    height: 50px;
    font-size:35px;
    font-weight: bold;
    z-index: 99;
    transition: 0.5s ease;
    cursor: pointer;
  }

  & .btnSideBar:hover{
    background-color: black;
    color: white;
  }

    & .SideBar {
    display: flex;
    justify-content: right;
    width: 100%;
    /* margin-right: 30px; */
  }
`;

const TypographyContent = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top: 5%;
  height: 100vh;
  width: 100%;
`;