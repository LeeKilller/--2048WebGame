import randomCreateItem from "../randomCreateItem.js";

const clickRight = (stateMatrix) => {
    //console.log(stateMatrix);
    const length = stateMatrix.length;
    for(let i = 0; i < length; i++) {
        let tarPos = 3;
        let frontEle = null;
        for(let j = length - 1; j >= 0; j--) {
            const ele = stateMatrix[i][j];
            if(ele === null) continue;

            if(frontEle === null) {
                ele.moveInRow(tarPos);
                frontEle = ele;
                continue;
            }

            if(frontEle.value !== ele.value) {
                tarPos--;
                ele.moveInRow(tarPos);
                frontEle = ele;
                continue;
            }

            const tarEle = frontEle;

            ele.moveInRow(tarPos, -1)
            .then(()=>{
                ele.handleDestroy(tarEle)
            })

            tarPos--;
            frontEle = null;
        }
    }
}

export default clickRight;