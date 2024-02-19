import React, { useState } from 'react'
import styled from 'styled-components';
import SideBar from './components/SideBar';
import SideBarContent from './components/SideBarContent';
import Typography from './components/Typography';
import { TypoProvider } from './contexts/TypoContext';
function App() {
  // 사이드바 열고 닫기
  const [close, setClose] = useState(false);
  const closeMenu = (e) => {
    setClose(e);
  };
  return (
    <TypoProvider>
      <MainContainer>
        <Title></Title>
        <Typography />
        <div className="SideBar">
          <SideBar width={500} close={close} closeSet={closeMenu}>
            <SideBarContent close={closeMenu} />
          </SideBar>
        </div>
      </MainContainer>
    </TypoProvider>
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
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  height: 50px;
`