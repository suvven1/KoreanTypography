import React, { useContext } from 'react'
import styled from 'styled-components'
import { TypoContext } from '../contexts/TypoContext';

const SelectImg = ({ close }) => {
    const typoData = useContext(TypoContext);
    const changeImg = (url, type, color) => {
        close(true)
        typoData.imgUrl = url
        typoData.imgType = type
        typoData.color = color
        localStorage.setItem('typoData', JSON.stringify(typoData))
        setTimeout(() => {
            window.location.replace('/')
        }, [500])
    }
    return (
        <SelectBox>
            <div className='imgBox'>
                <div className='firstImg image' onClick={() => changeImg(`${process.env.PUBLIC_URL}/images/testImg.png`, 'yupmoon', '#ffffff')}></div>
                <div className='title'>엽문</div>
            </div>
            <div className='imgBox'>
                <div className='secondImg image' onClick={() => changeImg('https://pds.skyedaily.com/news_data2019/20211101180306_zgvezkoy.jpg', 'saejong', '#000000')}></div>
                <div className='title'>세종대왕</div>
            </div>
        </SelectBox>
    )
}

export default SelectImg

const SelectBox = styled.div`
    width: 100%;
    height: 450px;
    background-color: grey;
    position: absolute;
    top:100px;
    display: flex;
    flex-direction: column;
    justify-content: center;


    .image {
        width: 200px;
        height: 200px;
        background-size: cover;
        background-position: center;
        border-radius: 10px;
        cursor: pointer;
    }

    .image:hover {
        width: 210px;
        height: 210px;
    }

    .imgBox{
        width: 80%;
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 25px;
        font-weight: bold;
        margin-left:60px;
    }

    .title{
        width: 150px;
        text-align:center;
    }

    .firstImg {
        background-image: url(${process.env.PUBLIC_URL}/images/testImg.png);
    }
    .secondImg {
        background-image: url(https://pds.skyedaily.com/news_data2019/20211101180306_zgvezkoy.jpg);
    }
`
