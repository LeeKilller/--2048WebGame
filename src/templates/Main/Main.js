import { getFileContentSync } from "@/tools/index.js";

const Main = () => {
    const template = getFileContentSync("/templates/Main/Main.html");

    const containerItems = Array(16).fill(0).map(()=>`<div class="container-items"></div>`).join("");


    return eval("`"+ template +"`");
}

export default Main;