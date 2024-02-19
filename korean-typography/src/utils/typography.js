let positionIndex = 0; // 좌표 인덱스

// 이미지별 XY 좌표
let saejongX = [30, 35, 45, 55, 70, 85, 110, 135, 165, 195, 225, 215, 210, 215, 220, 225, 235, 245, 265, 290, 315, 335, 345, 355, 360, 365, 370, 365, 355, 380, 410, 440, 470, 500, 505, 515, 525, 535, 540, 510, 480, 450, 420, 390, 360, 330, 300, 270, 240, 210, 180, 150, 120, 90, 60]
let saejongY = [570, 540, 510, 480, 450, 420, 390, 375, 360, 345, 330, 300, 270, 235, 200, 170, 140, 115, 100, 115, 100, 115, 140, 170, 200, 235, 270, 300, 330, 345, 360, 375, 390, 420, 450, 480, 510, 540, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570]
let yupmoonX = [10, 40, 70, 100, 120, 135, 120, 110, 110, 105, 110, 125, 150, 190, 240, 280, 315, 330, 330, 330, 325, 315, 300, 290, 290, 325, 360, 400, 420, 430, 450, 485, 520, 555, 575, 575, 575, 575, 545, 505, 480, 505, 535, 555, 570, 575, 535, 500, 465, 430, 400, 370, 340, 310, 280, 250, 220, 190, 160, 130, 100, 70, 40, 10, 5, 5, 0, 0, 0, 0]
let yupmoonY = [355, 330, 315, 300, 265, 230, 205, 170, 135, 100, 65, 30, 5, 0, 0, 0, 20, 60, 100, 140, 180, 220, 255, 280, 310, 325, 325, 315, 280, 235, 205, 195, 195, 200, 240, 280, 320, 360, 385, 405, 425, 450, 470, 490, 520, 560, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 540, 510, 480, 450, 420, 390]
// 초성
const first = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
// 중성
const middle = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
// 종성
const last = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const startKorean = 44032; // '가' 유니코드
const lastKorean = 55203; // '힣' 유니코드

// 자음 모음 분해 함수
function getConstantVowel(kor, imgType) {
    let result = []; // 최종 결과
    let combinationResultArr = []; // 조합된 글자 배열
    let XPosition; // 글자의 X좌표
    let YPosition; // 글자의 Y좌표

    for (let i = 0; i < kor.length; i++) {
        let uni = kor[i].charCodeAt(0); // 입력한 글자 각각 유니코드로 변환
        let forIndexUni = uni - startKorean; // 인덱스 번호 계산을 위해 입력 글자 유니코드에서 '가' 유니코드 빼기

        let firstIndex = parseInt(forIndexUni / 588); // 초성 인덱스
        let middleIndex = parseInt((forIndexUni - (firstIndex * 588)) / 28); // 중성 인덱스
        let lastIndex = parseInt(forIndexUni % 28); // 종성 인덱스

        let decompKorArr = [[]]; // 분해된 자음 또는 모음 배열  ex) [['ㄱ', Y좌표, X좌표],['ㄴ', Y좌표, X좌표], ...]
        const combinationFormulaArr = [firstIndex * 21 * 28, middleIndex * 28, lastIndex]; // 글자 조합식 배열
        let combination = startKorean; // 조합된 글자 유니코드
        let combinationResult = []; // 조합된 글자 배열

        // 한글인지 아닌지 구분하여 로직 실행
        if (uni >= startKorean && uni <= lastKorean) {
            decompKorArr = [[first[firstIndex]], [middle[middleIndex]], [last[lastIndex]]];

            // 분해된 글자 배열 중 공백 제거 로직
            for (let j = 0; j < 3; j++) {
                if (decompKorArr[j][0] === '') { decompKorArr.splice(j, 1); }
            }

            // 조합된 글자 배열 생성
            for (let j = 0; j < decompKorArr.length; j++) {
                combination += combinationFormulaArr[j];
                if (j === 0) {
                    if (i === 0) {
                        combinationResult.push(decompKorArr[0][0]);
                    } else {
                        combinationResult.push(combinationResultArr[i - 1][combinationResultArr[i - 1].length - 1] + decompKorArr[0][0]);
                    }
                } else {
                    if (i === 0) {
                        combinationResult.push(String.fromCharCode(combination));
                    } else {
                        combinationResult.push(combinationResultArr[i - 1][combinationResultArr[i - 1].length - 1] + String.fromCharCode(combination));
                    }
                }
            }
        } else {
            combinationResult.push(combinationResultArr[combinationResultArr.length - 1][combinationResultArr[combinationResultArr.length - 1].length - 1] + kor[i]);
        }
        combinationResultArr.push(combinationResult);

        // 이미지 종류에 따른 좌표 설정
        if (imgType == 'yupmoon') {
            XPosition = yupmoonX
            YPosition = yupmoonY
        } else {
            XPosition = saejongX
            YPosition = saejongY
        }

        // 조합된 글자 배열에 해당하는 좌표 설정
        for (let i = 0; i < decompKorArr.length; i++) {
            // 입력된 글자수가 지정된 좌표수를 초과시 고정좌표 지정 
            if (YPosition.length <= positionIndex) {
                decompKorArr[i].push(570);
                decompKorArr[i].push(5);
            } else {
                decompKorArr[i].push(YPosition[positionIndex]);
                decompKorArr[i].push(XPosition[positionIndex]);
            }
            positionIndex++;
        }

        result.push({
            kor: String.fromCharCode(startKorean + firstIndex * 21 * 28 + middleIndex * 28 + lastIndex),
            decompKorArr: decompKorArr,
            combinationResult: combinationResult
        });
    }
    positionIndex = 0
    return result;
}

// 분해된 자음 모음 투명도 및 텍스트 결과 출력 로직
async function replaceBox({ res, setBoxClassNames, setTextRes, setStart }) {
    let len = 0;
    for (let i = 0; i < res.length; i++) {
        len += res[i].decompKorArr.length;
    }

    await setOpacity(len, setBoxClassNames)
    await setTextResult(res, setTextRes);

    setStart(false);
}

// 투명도 설정 로직
function setOpacity(len, setBoxClassNames) {
    let opacityDelay = 300;
    let name = "";
    for (let i = 0; i < len + 1; i++) {
        setTimeout(() => {
            if (name === "") {
                name = `box${i}`;
                setBoxClassNames(`box${i}`);
            } else {
                name += `, .box${i}`;
                setBoxClassNames(name);
            }
        }, [opacityDelay]);
        opacityDelay += 1;
    }
}

// 텍스트 출력 로직
function setTextResult(res, setTextRes) {
    let textDelay = 1600;
    for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[i].combinationResult.length; j++) {
            setTimeout(() => {
                setTextRes(res[i].combinationResult[j]);
            }, textDelay);
            textDelay += 300;
        }
    }
}

export { getConstantVowel, replaceBox };
