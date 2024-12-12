import randomCreateItem from "../randomCreateItem.js";
import { gloablVar } from "../global";

const { animationQue } = gloablVar;



const clickLeft = (stateMatrix) => {
    //console.log(stateMatrix);
    const length = stateMatrix.length;
    for(let i = 0; i < length; i++) {
        let tarPos = 0;
        let frontEle = null;
        for(let j = 0; j < length; j++) {
            const ele = stateMatrix[i][j];
            if(ele === null) continue;

            if(frontEle === null) {
                animationQue.push(ele.moveInRow(tarPos));
                frontEle = ele;
                continue;
            }

            if(frontEle.value !== ele.value) {
                tarPos++;
                animationQue.push(ele.moveInRow(tarPos));
                frontEle = ele;
                continue;
            }

            const tarEle = frontEle;

           animationQue.push( ele.moveInRow(tarPos,-1)
           .then(()=>{
               ele.handleDestroy(tarEle);
           }));

            tarPos++;
            frontEle = null;
        }
    }

}

export default clickLeft;