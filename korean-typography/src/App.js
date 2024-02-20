import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import SideBar from './components/SideBar';
import SideBarContent from './components/SideBarContent';
import Typography from './components/Typography';
import TypographyContent from './components/TypographyContent';
import MainPage from './components/MainPage';
import { TypoProvider } from './contexts/TypoContext';
import Header from './components/Header';
function App() {
  // 사이드바 열고 닫기
  const [typoClose, setTypoClose] = useState(false);
  const closeTypo = (e) => {
    setTypoClose(e);
  };

  return (
    <TypoProvider>
      <MainContainer>
        <Header closeTypo={closeTypo} />
        <div style={{ height: '70px' }}></div>
        <MainPage closeTypo={closeTypo} />

        <div className="SideBar">
          <Typography width={100} typoClose={typoClose} closeTypo={closeTypo}>
            <TypographyContent closeTypo={closeTypo} />
          </Typography>
        </div>
      </MainContainer>
    </TypoProvider>
  );
}

export default App;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .SideBar {
    display: flex;
    justify-content: right;
    width: 100%;
    margin-right: 30px;
  }
`