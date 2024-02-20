import React from 'react'
import styled from 'styled-components'

const Header = ({ closeTypo }) => {
    return (
        <HeaderBox>
            <div onClick={() => { closeTypo('close') }}>Jamo Typography</div>
        </HeaderBox>
    )
}

export default Header

const HeaderBox = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: whitesmoke;
    box-shadow: 0px -40px 100px 20px black;
    z-index: 10000;
    div{
    width: fit-content;
    padding-left: 20px;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
}
`