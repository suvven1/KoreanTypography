// 모듈화된 함수
let positionNum = 0;
let XPosition = [10, 40, 70, 100, 120, 135, 120, 110, 110, 105, 110, 125, 150, 190, 240, 280, 315, 330, 330, 330, 325, 315, 300, 290, 290, 325, 360, 400, 420, 430, 450, 485, 520, 555, 575, 575, 575, 575, 545, 505, 480, 505, 535, 555, 570, 575, 535, 500, 465, 430, 400, 370, 340, 310, 280, 250, 220, 190, 160, 130, 100, 70, 40, 10, 5, 5, 0, 0, 0, 0]
let YPosition = [355, 330, 315, 300, 265, 230, 205, 170, 135, 100, 65, 30, 5, 0, 0, 0, 20, 60, 100, 140, 180, 220, 255, 280, 310, 325, 325, 315, 280, 235, 205, 195, 195, 200, 240, 280, 320, 360, 385, 405, 425, 450, 470, 490, 520, 560, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 570, 540, 510, 480, 450, 420, 390]
function getConstantVowel(kor) {
    const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    const startKorean = 44032;
    const lastKorean = 55203;
    let result = [];
    let joinResultArr = [];
    for (let i = 0; i < kor.length; i++) {
        let uni = kor[i].charCodeAt(0);
        let uni2 = uni - startKorean;

        let fn = parseInt(uni2 / 588);
        let sn = parseInt((uni2 - (fn * 588)) / 28);
        let tn = parseInt(uni2 % 28);
        let korArr = [[]];
        const joinArr = [fn * 21 * 28, sn * 28, tn];
        let join = startKorean;
        let joinResult = [];
        if (uni >= startKorean && uni <= lastKorean) {
            korArr = [[f[fn]], [s[sn]], [t[tn]]];
            for (let j = 0; j < 3; j++) {
                if (korArr[j][0] === '') { korArr.splice(j, 1); }
            }
            for (let j = 0; j < korArr.length; j++) {
                join += joinArr[j];
                if (j === 0) {
                    if (i === 0) {
                        joinResult.push(korArr[0][0]);
                    } else {
                        joinResult.push(joinResultArr[i - 1][joinResultArr[i - 1].length - 1] + korArr[0][0]);
                    }
                } else {
                    if (i === 0) {
                        joinResult.push(String.fromCharCode(join));
                    } else {
                        joinResult.push(joinResultArr[i - 1][joinResultArr[i - 1].length - 1] + String.fromCharCode(join));
                    }
                }
            }
        } else {
            joinResult.push(joinResultArr[joinResultArr.length - 1][joinResultArr[joinResultArr.length - 1].length - 1] + kor[i]);
        }
        joinResultArr.push(joinResult);

        for (let i = 0; i < korArr.length; i++) {
            korArr[i].push(YPosition[positionNum]);
            korArr[i].push(XPosition[positionNum]);
            positionNum++;
        }


        result.push({
            kor: String.fromCharCode(startKorean + fn * 21 * 28 + sn * 28 + tn),
            korArr: korArr,
            flowArr: joinResult
        });
    }
    positionNum = 0
    return result;
}

function textDestroy(text) {
    const test = getConstantVowel(text);
    return test;
}

function replaceBox({ res, setOpac, setTextRes, setStart }) {
    let len = 0;
    for (let i = 0; i < res.length; i++) {
        len += res[i].korArr.length;
    }

    let delay2 = 300;
    let name = "";
    for (let i = 0; i < len + 1; i++) {
        setTimeout(() => {
            if (name === "") {
                name = `box${i}`;
                setOpac(`box${i}`);
            } else {
                name += `, .box${i}`;
                setOpac(name);
            }
        }, [delay2]);
        delay2 += 30;
    }

    let delay1 = 2100;
    for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[i].flowArr.length; j++) {
            setTimeout(() => {
                setTextRes(res[i].flowArr[j]);
            }, delay1);
            delay1 += 300;
        }
    }
    setStart(false);
}

export { textDestroy, replaceBox };
