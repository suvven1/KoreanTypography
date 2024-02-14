import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
const typo = require('../utils/typography')

const Typography = ({ replace }) => {
    const [points, setPoints] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    useEffect(() => {
        if (points.length != 0) {
            const now = points[points.length - 1]
            const before = points[points.length - 2]
            let distance = Math.sqrt((now?.x - before?.x) ** 2 + (now?.y - before?.y) ** 2)
            if (distance < 11 && distance >= 10) {

            }
            console.log(now);
        }
    }, [points])
    const handleMouseDown = (event) => {
        setIsDrawing(true);
        const { offsetX, offsetY } = event.nativeEvent;
        setPoints([{ x: offsetX, y: offsetY }]);
    };

    const handleMouseMove = (event) => {
        if (isDrawing) {
            const { offsetX, offsetY } = event.nativeEvent;
            setPoints([...points, { x: offsetX, y: offsetY }]);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    // ----
    const [opacity, setOpacity] = useState();
    const [start, setStart] = useState(true);
    const [textResult, setTextResult] = useState("")
    const [res, setRes] = useState([])
    let num = 0
    let moveDelay = 0
    let gap = 0
    let top = 5;
    useEffect(() => {
        if (replace) {
            setRes(typo.textDestroy(replace));
            setTextResult("")
            setOpacity("")
            setStart(true)
        }
    }, [replace])

    useEffect(() => {
        setTimeout(() => {
            if (res.length != 0) {
                typo.replaceBox({ res, setOpac: setOpacity, setTextRes: setTextResult, setStart: setStart })
            }
        }, 2000)
    }, [res])
    return (
        <Box color={opacity}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <ImgContainer>
                <polyline
                    points={points.map(point => `${point.x},${point.y}`).join(' ')}
                    fill="none"
                    stroke="white"
                    strokeWidth="5"
                />
            </ImgContainer>
            <div className='textResult'>
                {textResult}
            </div>
            <div className='boxs'>
                {res.map((boxes, index) => {
                    if (index % 9 == 0) {
                        gap = 0
                        top += 30
                    }
                    return (
                        <div
                            key={index}
                        >
                            {boxes.korArr.map((box) => {
                                // console.log(gap);
                                moveDelay += 0.3
                                let move = start ? { top: box[1], left: box[2] } : { transition: `all ${2}s ease-in-out ${moveDelay}s`, animation: `rotate ${0.5}s linear ${moveDelay}s infinite`, top: `${top}px`, left: `${380 + gap * 8}px` }
                                num++
                                gap++
                                return (
                                    <div
                                        key={num}
                                        className={`box box${num}`}
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
background-image: url(${process.env.PUBLIC_URL}/images/testImg.png);
background-size: cover;
background-position: center;

`
const Box = styled.div`
display: flex;
flex-direction: column;
position: relative;
width: 600px;
height: 600px;

& .textResult{
    padding: 10px;
    width: 200px;
    height: 170px;
    position: absolute;
    top:10px;
    right: 10px;
    font-size: 25px;
    font-weight: bold;
    color: white;
    background-color: #c2c2c279;
    border-radius: 10px;
}

& .box {
  font-size:25px;
  color: white;
  font-weight: bold;
  position: absolute;
}

& .${props => props.color}{
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