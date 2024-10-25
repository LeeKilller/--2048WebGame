import { NumberItem } from "/Classes/index.js";
import { curScore } from "./global.js";


const getRandomPos = (matrix, count = 2) => {
    const colLength = matrix.length;
    const rowLength = matrix[0].length;

    const randomArr = Array(colLength*rowLength).fill(0).map((_, index) => index);

    const random1 = randomArr.splice(Math.floor(Math.random()*randomArr.length),1)[0];

    const random2 = randomArr.splice(Math.floor(Math.random()*randomArr.length),1)[0];

    //console.log(random1, random2);

    return [
        [Math.floor(random1/rowLength),random1%rowLength],
        [Math.floor(random2/rowLength),random2%rowLength]
    ]
}


const initContainer = (stateMatrix) => {
    const score = document.querySelector("#score");
    const container = document.querySelector('#main-real-container');

    // 初始化
    for(let i = 0; i < stateMatrix.length; i++) {
        for(let j = 0; j < stateMatrix[i].length; j++) {
            stateMatrix[i][j] = null;
        }
    }
    score.innerText = 0;
    container.innerHTML = '';
    curScore.value = 0;

    // 获取随机的两个位置
    const [pos1, pos2] = getRandomPos(stateMatrix);
    
    const randomNum1 = Math.random()>1/3?2:4;

    const randomNum2 = Math.random()>1/3?2:4;

    // 再初始化好这两个位置的数据
    new NumberItem({
        value:randomNum1,
        posX:pos1[0],
        posY:pos1[1],
        parent:container,
        matrix:stateMatrix
    })

    new NumberItem({
        value:randomNum2,
        posX:pos2[0],
        posY:pos2[1],
        parent:container,
        matrix:stateMatrix
    })

    //console.log(stateMatrix);
}


export default initContainer;