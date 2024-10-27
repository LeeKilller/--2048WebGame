

const handleWin = (clickEventFun) => {
    document.querySelector('.main-win').style.display = 'flex';
    document.removeEventListener('keyup',clickEventFun);
}

export default handleWin;