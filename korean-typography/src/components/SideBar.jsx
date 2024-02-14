import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';

const SideBar = ({ width = 280, children, close, closeSet }) => {

    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(-width + 80);
    const side = useRef();
    // button 클릭 시 토글
    const toggleMenu = () => {
        if (xPosition < 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(-width + 80);
            setOpen(false);
        }
    };

    //메뉴 닫기 함수
    const closeMenu = (e) => {
        if (e) {
            setX(-width + 80);
            setOpen(false);
        }
    };
    useEffect(() => {
        closeMenu(close);
        closeSet(false);
    }, [close]);

    // 사이드바 외부 클릭시 닫히는 함수
    const handleClose = async (e) => {
        let sideArea = side.current;
        let sideCildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideCildren)) {
            await setX(-width + 80);
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
        // <div style={{ display: 'flex', flexDirection: 'column', width: '40%', alignItems: "center", border: '3px solid black', padding: '30px', marginTop: '60px', backgroundColor: '#bdbdbd' }}>

        // </div>
        <SideBarBox>
            <SideBarView
                ref={side}
                style={{
                    width: `${width}px`,
                    height: "100%",
                    transform: `translatex(${-xPosition}px)`,
                }}
            >
                <div onClick={toggleMenu} className="btnSideBar btnOn">ㄱ</div>
                {/* {isOpen ? (
                    <div onClick={toggleMenu} className="btnSideBar btnOn"></div>
                ) : (
                    <img
                        src={`${process.env.PUBLIC_URL}/images/Menu.png`}
                        onClick={toggleMenu}
                        alt=""
                        className="btnSideBar btnOff"
                    />
                )} */}
                {/* 사이드바 컴포넌트 내부 값이 구현되는 위치 */}
                <SideBarContents>{children}</SideBarContents>
            </SideBarView>
        </SideBarBox>
    )
}

export default SideBar

const SideBarBox = styled.div`
  /* background-color: aliceblue; */
`;

const SideBarView = styled.div`
  background-color: grey;
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
    /* border: 1px solid black; */
    border-radius: 50%;
    position: relative;
    top: 15px;
    left: 15px;
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

  & .btnOff {
    left: -55px;
    /* background-color: white;
    border-radius: 50%; */
  }
  & .btnOn {
    /* left: 300px; */
  }
`;

const SideBarContents = styled.div`
  position: relative;
  top: -35px;
  height: 100vh;
  width: 100%;
`;