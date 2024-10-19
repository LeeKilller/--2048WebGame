import {NumberItem} from "/Classes/index.js";
import checkEnd from "./checkEnd.js";

const randomCreateItem = (stateMatrix, keyUpHandler) => {
    const container = document.querySelector('#main-real-container');
    //console.log('random',stateMatrix);
    const spareArray = [];

    for(let i = 0; i < stateMatrix.length; i++) {
        for(let j = 0; j < stateMatrix[i].length; j++) {
            if(stateMatrix[i][j] === null) spareArray.push([i, j]);
        }
    }
    //console.log('spare',spareArray);


    const [posX, posY] = spareArray[Math.floor(Math.random()*spareArray.length)];

    const value = Math.random()>1/3?2:4;

    new NumberItem({
        value,
        posX,
        posY,
        matrix:stateMatrix,
        parent:container
    });
    
    if(spareArray.length === 1) checkEnd(stateMatrix, keyUpHandler);

}

export default randomCreateItem;