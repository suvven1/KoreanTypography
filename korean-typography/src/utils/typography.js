// 초성
const first = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
// 중성
const middle = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
// 종성
const last = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const startKorean = 44032; // '가' 유니코드
const lastKorean = 55203; // '힣' 유니코드

// 자음 모음 분해 함수
function getConstantVowel(kor, imgSize) {
    let result = []; // 최종 결과
    let combinationResultArr = []; // 조합된 글자 배열

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

        // 글자 랜덤 좌표 설정
        for (let i = 0; i < decompKorArr.length; i++) {
            decompKorArr[i].push(Math.random() * (imgSize[1] - 40))
            decompKorArr[i].push(Math.random() * (imgSize[0] - 40))
        }

        result.push({
            kor: String.fromCharCode(startKorean + firstIndex * 21 * 28 + middleIndex * 28 + lastIndex),
            decompKorArr: decompKorArr,
            combinationResult: combinationResult
        });
    }
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
