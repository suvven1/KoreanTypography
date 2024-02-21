import React from 'react'
import styled from 'styled-components'

const MainPage = ({ closeTypo }) => {

    return (
        <MainBox>
            <Title>
                <div>JAMO</div>
                <div>TYPOGRAPHY</div>
            </Title>
            <Start onClick={() => { closeTypo(true) }}>
                <div className='img'></div>
                <div className='text'>Start Typography!</div>
            </Start>
        </MainBox>
    )
}

export default MainPage

const MainBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 90vh;
    width: 90%;
`
const Title = styled.div`
font-size: 110px;
text-shadow: 6px 6px darkgray;
`

const Start = styled.div`
position: relative;
cursor: pointer;
    & .img{
        background-image: url(${process.env.PUBLIC_URL}/images/test1.png);
        background-size: cover;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 500px;
        height: 500px;
        border-radius: 20px;
        font-size: 50px;
        font-weight: bold;
        color: rgba(255,255,255,0);
        box-shadow: 10px 10px 10px 0px gray;
    }

    & .text{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        color: rgba(255,255,255,0);
        font-size: 50px;
        text-shadow: 3px 3px rgba(255,255,255,0);
    }

    &:hover .img{
        filter: brightness(40%);
    }
    &:hover .text{
            color: rgba(255,255,255,1);
            text-shadow: 3px 3px rgba(255,255,255,0.5);
    }


`