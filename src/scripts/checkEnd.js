const checkEnd = (stateMatrix,clickEventFun) => {
    const cover = document.querySelector(".main-cover");

    for(let i = 0; i < stateMatrix.length; i++) {
        for(let j = 0; j < stateMatrix[i].length; j++) {
            const curEle = stateMatrix[i][j];
            if(!curEle) continue;
            if(stateMatrix[i][j + 1] && stateMatrix[i][j + 1].value === curEle.value) return;
            if(stateMatrix[i + 1] && stateMatrix[i + 1][j].value === curEle.value) return; 
        }
    }
    cover.style.display = 'flex';

    document.removeEventListener('keyup',clickEventFun);

}

export default checkEnd;