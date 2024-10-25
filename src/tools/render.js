import { AfterMounted } from "/scripts/index.js";

const render = (template,root) => {
    root.innerHTML = template();

    AfterMounted();
}


export default render;