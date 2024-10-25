import run from "../run.js";


const Head = {
    next: null,
}

let p = Head;

const MyUseState = (val) => {

    if (!p.next) {
        p.next = {
            state: val,
            next: null
        }
    }

    p = p.next;

    const setState = (newVal) => {
        const curNode = p;
        if (curNode.state !== newVal) {
            curNode.state = newVal;
            p = Head;
            run();
        }
    }

    return [p.state, setState];
}


export default MyUseState;