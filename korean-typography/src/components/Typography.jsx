import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import TypoContext from '../contexts/TypoContext';
const typo = require('../utils/typography')

const Typography = () => {
    const fontStyle = JSON.parse(sessionStorage.getItem('fontStyle')); // 글자스타일(글씨체, 크기, 색상)
    const { data, update } = useContext(TypoContext) // 타이포그래피 정보(이미지, 색상, 입력한 텍스트, 글자 이동 상태)
    const [boxClassNames, setBoxClassNames] = useState(); // 글자 투명도 조절
    const [start, setStart] = useState(true); // 글자 이동 시작
    const [textResult, setTextResult] = useState("") // 출력되는 텍스트
    const [res, setRes] = useState([]) // 자음 모음 분리 결과
    let classNum = 0 // 생성되는 자음 모음에 부여될 클래스 번호
    let moveDelay = 0 // 순서대로 움직이게 하기 위한 자음 모음의 움직임 지연시간
    let widthGap = 0 // 출력 박스까지 이동한 자음 모음의 좌우 간격
    let heightGap = 5; // 출력 박스까지 이동한 자음 모음의 상하 간격

    /** 
        // 드래그 드로잉 관련 로직
        const [points, setPoints] = useState([]); // 마우스 좌표
        const [isDrawing, setIsDrawing] = useState(false); // 그리기 상태
        // 그림을 클릭하고 있는 상태에서 실행
        const handleMouseDown = (event) => {
            setIsDrawing(true);
            const { offsetX, offsetY } = event.nativeEvent;
            setPoints([{ x: offsetX, y: offsetY }]);
        };
    
        // 그림을 클릭하고 드래그하면 실행
        const handleMouseMove = (event) => {
            if (isDrawing) {
                const { offsetX, offsetY } = event.nativeEvent;
                setPoints([...points, { x: offsetX, y: offsetY }]);
            }
        };
    
        // 그림을 클릭하고 있는 상태에서 클릭하지않은 상태로 바뀔때 실행
        const handleMouseUp = () => {
            setIsDrawing(false);
        };
    */

    // 입력한 글자 분해
    useEffect(() => {
        if (data.replace) {
            setRes(typo.getConstantVowel(data.inputText, data.imgType));
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
        <Box data-boxclassnames={boxClassNames}
            data-textbackgroudcolor={data.textBackgroudColor}
            fontSize={fontStyle?.size}
            fontFamily={fontStyle?.family}
            color={fontStyle?.color}
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        >
            <ImgContainer data-imgurl={data.imgUrl}>
                {/* <polyline
                    points={points.map(point => `${point.x},${point.y}`).join(' ')}
                    fill="none"
                    stroke="white"
                    strokeWidth="5"
                /> */}
            </ImgContainer>
            <div className="hiddenBox"></div>
            <div className='textResult'>
                {textResult}
            </div>
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
                                let move = start ? { top: box[1], left: box[2] } : { transition: `all ${1.5}s ease-in-out ${moveDelay}s`, animation: `rotate ${0.5}s linear ${moveDelay}s infinite`, top: `${heightGap}px`, left: `${380 + widthGap * 8}px` }
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
        </Box>

    )
}

export default Typography

const ImgContainer = styled.svg`
width: 600px;
height: 600px;
border-radius: 10px;
background-image: url(${props => props['data-imgurl']});
background-size: cover;
background-position: center;
filter: brightness(60%);
`
const Box = styled.div`
display: flex;
flex-direction: column;
position: relative;
width: 600px;
height: 600px;

& .hiddenBox{
    width: 30px;
    height: 30px;
    background-color: #BDBDBD;
    border-radius: 50%;
    position: absolute;
    top:570px;
    z-index: -1;
    /* z-index: 10; */
}

& .textResult{
    padding: 10px;
    width: 200px;
    height: 170px;
    position: absolute;
    top:10px;
    right: 10px;
    font-size: ${props => props.fontSize};
    font-weight: bold;
    font-family: ${props => props.fontFamily};
    color: ${props => props.color};
    background-color: ${props => props['data-textbackgroudcolor'] + '50'};
    border-radius: 10px;
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

 & button{
    width: 70px;
    height: 35px;
    margin: 0 0 30px 10px;
    font-size: 18px;
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