import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import styled from 'styled-components';
import TypoContext from '../contexts/TypoContext';
const typo = require('../utils/typography')

const TypographyContent = () => {
    const fontStyle = JSON.parse(sessionStorage.getItem('fontStyle')); // 글자스타일(글씨체, 크기, 색상)
    const { data, update } = useContext(TypoContext) // 타이포그래피 정보(이미지, 색상, 입력한 텍스트, 글자 이동 상태)
    const imgRef = useRef(null);
    const [boxClassNames, setBoxClassNames] = useState(); // 글자 투명도 조절
    const [start, setStart] = useState(true); // 글자 이동 시작
    const [textResult, setTextResult] = useState("") // 출력되는 텍스트
    const [res, setRes] = useState([]) // 자음 모음 분리 결과
    const [imgIndex, setImgIndex] = useState(0) //
    const [imgSize, setImgSize] = useState();
    let classNum = 0 // 생성되는 자음 모음에 부여될 클래스 번호
    let moveDelay = 0 // 순서대로 움직이게 하기 위한 자음 모음의 움직임 지연시간
    let widthGap = 0 // 출력 박스까지 이동한 자음 모음의 좌우 간격
    let heightGap = 0; // 출력 박스까지 이동한 자음 모음의 상하 간격
    let imgList = ['test1', 'test2', 'test3']

    // 화면 크기 줄어들 시 사이드바로 전환
    const handelResize = () => {
        if (imgRef.current) {
            const width = imgRef.current.clientWidth; // 가로 길이 가져오기
            const height = imgRef.current.clientHeight; // 세로 길이 가져오기
            setImgSize([width, height])
        }
    };

    useEffect(() => {
        handelResize();
        window.addEventListener("resize", handelResize);
        return () => {
            window.removeEventListener("resize", handelResize);
        };
    }, [])

    const changeImage = (next) => {
        if (next) {
            if (imgIndex == 2) {
                setImgIndex(0);
            } else {
                setImgIndex(imgIndex + 1);
            }
        } else {
            if (imgIndex == 0) {
                setImgIndex(2);
            } else {
                setImgIndex(imgIndex - 1);
            }
        }
    }

    // 입력한 글자 분해
    useEffect(() => {
        if (data.replace) {
            setRes(typo.getConstantVowel(data.inputText, imgSize));
            update({
                ...data,
                replace: false
            })
            setBoxClassNames("")
            setStart(true)
        }
        setTextResult("")
    }, [data])

    // 분해한 자음 모음 투명도 설정 및 결과 출력
    useEffect(() => {
        setTimeout(() => {
            if (res.length != 0) {
                typo.replaceBox({ res, setBoxClassNames: setBoxClassNames, setTextRes: setTextResult, setStart: setStart })
            }
        }, 2000)
    }, [res])

    return (
        <Box
            fontSize={fontStyle?.size}
            fontFamily={fontStyle?.family}
            color={fontStyle?.color}>
            <ImgContainer
                data-imgname={imgList[imgIndex]}
                data-boxclassnames={boxClassNames}
                fontSize={fontStyle?.size}
                fontFamily={fontStyle?.family}
                color={fontStyle?.color}>
                <FaChevronLeft onClick={() => { changeImage(false) }} />
                <div className="image" ref={imgRef}>
                    <div className='boxs'>
                        {res.map((boxes, index) => {
                            if (index % 9 == 0) {
                                widthGap = 0
                                heightGap += 30
                            }
                            return (
                                <div
                                    key={index}
                                >
                                    {boxes.decompKorArr.map((box) => {
                                        moveDelay += 0.3
                                        let move = start ? { top: box[1], left: box[2] } : { transition: `all ${1.5}s ease-in-out ${moveDelay}s`, animation: `rotate ${0.5}s linear ${moveDelay}s infinite`, top: `${heightGap}px`, left: `${770 + widthGap * 8}px` }
                                        classNum++
                                        widthGap++
                                        return (
                                            <div
                                                key={classNum}
                                                className={`box box${classNum}`}
                                                style={move}
                                            >
                                                {box.length == 2 ? boxes.kor : box[0]}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <FaChevronRight onClick={() => { changeImage(true) }} />
            </ImgContainer>
            <div className='textResult'>
                {textResult}
            </div>
        </Box>

    )
}

export default TypographyContent

const ImgContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 30px;
width: calc(95vh);
height: 85vh;

& .image {
    position: relative;
    width: 90%;
    height: 90%;
    border-radius: 10px;
    background-image: url(${process.env.PUBLIC_URL}/images/${props => props['data-imgname']}.png);
    background-size: cover;
    background-position: center;
    box-shadow: 10px 10px 10px 0px gray;
    transition: all 1s ease-in-out;
    animation: fadeInOut 1s ease-in-out;

    @keyframes fadeInOut {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
}

& svg{
    font-size: 5vh;
    cursor: pointer;
}
& .box {
    font-family: ${props => props.fontFamily};
    font-size:${props => props.fontSize};
    color: ${props => props.color};
    font-weight: bold;
    position: absolute;
}

& .${props => props['data-boxclassnames']}{
    opacity: 0;
}
`
const Box = styled.div`
display: flex;
width: 90%;
gap: 160px;
& .textResult{
    margin-top: 33px;
    padding: 10px;
    width: 60vh;
    height: 74vh;
    font-size: ${props => props.fontSize};
    font-weight: bold;
    font-family: ${props => props.fontFamily};
    color: ${props => props.color};
    background-color: white;
    border-radius: 10px;
    text-shadow: 3px 3px darkgray;
    box-shadow: 10px 10px 10px 0px gray;
}

 @keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`