
const gloablVar = {
    hasItemMoved:false,
    isWin:false
}

const bestScore = new Proxy({
    value:Number(localStorage.getItem('bestScore')) || 0
},{
    set(target, property, value){
        target[property] = value;
        localStorage.setItem('bestScore',value+'');
        document.querySelector('#best').innerHTML = value;
        return true;
    }
})


const curScore = new Proxy({
    value:0
},{
    set(target, property, value){
        target[property] = value;
        if(value > bestScore.value) bestScore.value = value;
        document.querySelector('#score').innerHTML = value;
        return true;
    }
});


export {
    gloablVar,
    curScore
}