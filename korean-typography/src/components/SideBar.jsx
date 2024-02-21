import React, { useEffect, useRef, useState } from 'react'
import { IoIosOptions } from "react-icons/io";
import styled from 'styled-components';

const SideBar = ({ width, children, inputClose, closeInput }) => {

    const xWidth = `calc(${width}% + 46%)`
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(xWidth);
    const side = useRef();

    // button 클릭 시 토글
    const toggleMenu = () => {
        if (xPosition != 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(xWidth);
            setOpen(false);
        }
    };

    //메뉴 닫기 함수
    const closeMenu = (e) => {
        if (e) {
            setX(xWidth);
            setOpen(false);
        }
    };

    useEffect(() => {
        closeMenu(inputClose);
        closeInput(false);
    }, [inputClose]);

    // 사이드바 외부 클릭시 닫히는 함수
    const handleClose = async (e) => {
        let sideArea = side.current;
        let sideCildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideCildren)) {
            await setX(xWidth);
            await setOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClose);
        return () => {
            window.removeEventListener("click", handleClose);
        };
    });

    return (
        <SideBarBox
            ref={side}
            style={{
                width: `${width}%`,
                height: "100%",
                transform: `translatex(${xPosition})`,
            }}
        >
            <div style={{ height: '70px' }}></div>
            <div onClick={toggleMenu} className="btnSideBar btnOn"><IoIosOptions />
            </div>
            {/* 사이드바 컴포넌트 내부 값이 구현되는 위치 */}
            <SideBarContents>{children}</SideBarContents>
        </SideBarBox>
    )
}

export default SideBar

const SideBarBox = styled.div`
  background-color: #bed5ffa6;
  position: fixed;
  top: 0;
  bottom: 0;
  /* right: -315px; */
  right: 0;
  transition: 0.4s ease;
  color: #202020;
  height: 100%;
  z-index: 99;

  box-shadow: 10px 10px 50px 0px #6494ed88 inset;

  & .btnSideBar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    /* border: 1px solid black; */
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
    background-color: lightgray;
    color: white;
  }
`;

const SideBarContents = styled.div`
  position: absolute;
  top: 0px;
  height: 100vh;
  width: 100%;
`;