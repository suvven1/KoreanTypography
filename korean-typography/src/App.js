import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import SideBar from './components/SideBar';
import SideBarContent from './components/SideBarContent';
import Typography from './components/Typography';
import { TypoContext } from './contexts/TypoContext';
const typo = require('./utils/typography')
function App() {
  const typoData = JSON.parse(localStorage.getItem("typoData"));

  useEffect(() => {
    if (typoData == null) {
      localStorage.setItem("typoData", JSON.stringify({
        imgUrl: `${process.env.PUBLIC_URL}/images/testImg.png`,
        imgType: 'yupmoon',
        replace: false,
        inputText: "",
        color: 'white'
      }));
      window.location.replace('/')
    }

  }, [])

  // 사이드바 열고 닫기
  const [close, setClose] = useState(false);
  const closeMenu = (e) => {
    setClose(e);
  };

  return (
    <TypoContext.Provider value={typoData}>
      <MainContainer>
        <Title>자모 타이포그래피</Title>
        <Typography />
        <div className="SideBar">
          <SideBar width={500} close={close} closeSet={closeMenu}>
            <SideBarContent close={closeMenu} />
          </SideBar>
        </div>
      </MainContainer>
    </TypoContext.Provider>
  );
}

export default App;

const MainContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;

  & .SideBar {
    display: flex;
    justify-content: right;
    width: 100%;
    margin-right: 30px;
  }
`
const Title = styled.div`
  /* align-self: start; */
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
`