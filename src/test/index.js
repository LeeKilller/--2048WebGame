

const arr1 = [
    [2,4,2,8],
    [4,16,8,4],
    [8,64,32,2],
    [64,128,512,64]
]

const arr2 = [
    [4,8,4,2],
    [4,16,64,4],
    [16,32,256,8],
    [128,512,4,128]
]


const fn = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            const curEle = arr[i][j];
            if(!curEle) continue;
            if(arr[i][j + 1] && arr[i][j + 1] === curEle) return;
            if(arr[i + 1] && arr[i + 1][j] === curEle) return; 
        }
    }

    console.log('loose');
}

fn(arr2);