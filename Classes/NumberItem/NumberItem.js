import { gloablVar, curScore } from "/scripts/global.js";

const getGridPos = (index) => {
    const posArray = ['0','120','240','360'];
    return posArray[index]
}

const getClass = (value) => {
    if(value <= 2048) return `tile-${value}`;

    return 'tile-super';
}

const curMatrix = Symbol('matrix');
const Parent = Symbol('parent');
const pos = Symbol('pos');

class NumberItem {
    // 构造器，初始化并挂载至父元素上
    constructor ({value, posX, posY, matrix, parent}) {
        this.value = value;
        this.element = document.createElement("div");
        this[curMatrix] = matrix;
        this[pos] = [posX, posY];
        this[Parent] = parent;

        this.element.innerText = value;
        this.element.style.top = getGridPos(posX) + 'px';
        this.element.style.left = getGridPos(posY) + 'px';
        this.element.classList.add(getClass(value));
        this.element.classList.add('container-item');
        parent.appendChild(this.element);

        // 将该元素保存在矩阵对应位置
        this[curMatrix][posX][posY] = this;
    }

    moveInCol(index,zIndex) {
        if(zIndex !== undefined) {
            this.element.style.zIndex = zIndex;
            const [x, y] = this[pos];
            this[curMatrix][x][y] = null;
        }
        else {
            // 该元素不会被摧毁的情况
            const [curX,curY] = this[pos];
            if(curX === index) return;
            this[pos] = [index,curY];
            this[curMatrix][curX][curY] = null;
            this[curMatrix][index][curY] = this;
        }
        
        gloablVar.hasItemMoved = true;

        const tarValue = Number(getGridPos(index));

        let curValue = Number(this.element.style.top.slice(0,-2));

        const step = (tarValue - curValue)/10;

        const p = new Promise((resolve) => {
            const animationFunc = () => {
                curValue = Number(this.element.style.top.slice(0,-2));
                if(Math.abs(curValue - tarValue) < Math.abs(step)) {
                    this.element.style.top = tarValue + 'px';
                    resolve();
                    return;
                }
                this.element.style.top = curValue + step + 'px';
                requestAnimationFrame(animationFunc);
            }
    
            animationFunc();
        })

        this.element.style.zIndex = 0;

        return p;

    }
  
    moveInRow(index,zIndex){
        if(zIndex !== undefined) {
            this.element.style.zIndex = zIndex;
            const [x, y] = this[pos];
            this[curMatrix][x][y] = null;
        }
        else {
            // 该元素不会被摧毁的情况
            const [curX,curY] = this[pos];
            if(curY === index) return;
            this[pos] = [curX,index];
            this[curMatrix][curX][curY] = null;
            this[curMatrix][curX][index] = this;
            
        }

        gloablVar.hasItemMoved = true;
        
        const tarValue = Number(getGridPos(index));

        let curValue = Number(this.element.style.left.slice(0,-2));

        const step = (tarValue - curValue)/10;

        const p = new Promise((resolve) => {
            const animationFunc = () => {
                curValue = Number(this.element.style.left.slice(0,-2));
                if(Math.abs(curValue - tarValue) < Math.abs(step)) {
                    this.element.style.left = tarValue + 'px';
                    resolve();
                    return;
                }
                this.element.style.left = curValue + step + 'px';
                requestAnimationFrame(animationFunc);
            }
    
            animationFunc();
        })

        this.element.style.zIndex = 0;

        return p;
    
    }

    handleCombine(){
        const element = this.element;
        const curValue = this.value;
        element.classList.remove(getClass(curValue));
        element.classList.add(getClass(curValue*2));
        this.value = curValue*2;
        element.innerText = this.value;

        curScore.value += curValue*2;

        const step = 0.02;

        const animationFunc = (value) => {
            if(Math.abs(value - 0.2) < step) {
                element.style.transform = `scale(1)`
                return;
            }
            let tarValue;
            if(value < 0.1) tarValue = 1 + value;
            else tarValue = 1.2 - value;
            element.style.transform = `scale(${tarValue})`
            requestAnimationFrame(()=>{animationFunc(value + step)});
        }

        animationFunc(0);

    }

    handleDestroy(tarEle) {
        this[Parent].removeChild(this.element);
        tarEle.handleCombine();
    }
}


export default NumberItem;