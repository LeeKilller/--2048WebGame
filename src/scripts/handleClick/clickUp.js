import randomCreateItem from "../randomCreateItem.js";
import { gloablVar } from "../global";

const { animationQue } = gloablVar;


const clickUp = (stateMatrix) => {
    //console.log(stateMatrix);
    const length = stateMatrix.length;
    for(let i = 0; i < length; i++) {
        let tarPos = 0;
        let frontEle = null;
        for(let j = 0; j < length; j++) {
            const ele = stateMatrix[j][i];
            if(ele === null) continue;

            if(frontEle === null) {
                animationQue.push(ele.moveInCol(tarPos));
                frontEle = ele;
                continue;
            }

            if(frontEle.value !== ele.value) {
                tarPos++;
                animationQue.push(ele.moveInCol(tarPos));
                frontEle = ele;
                continue;
            }

            const tarEle = frontEle;

            animationQue.push(ele.moveInCol(tarPos,-1)
            .then(()=>{
                ele.handleDestroy(tarEle);
            }))

            tarPos++;
            frontEle = null;
        }
    }
}

export default clickUp;