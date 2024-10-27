import content from './Main.html';

const Main = () => {
    const containerItems = Array(16).fill(0).map(()=>`<div class="container-items"></div>`).join("");

    return eval("`" + content + "`");
}

export default Main;