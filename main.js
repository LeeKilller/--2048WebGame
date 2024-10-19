import render from "./tools/render.js";
import run from "./tools/run.js";

import App from "./App.js"

const root = document.querySelector('#root');

run(render,App,root);


console.log("main.js has run.");