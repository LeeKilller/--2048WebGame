import render from "./tools/render.js";
import run from "./tools/run.js";
import App from "./App.js";
import "./index.css";



const root = document.createElement('div');

root.id = 'root';

document.body.appendChild(root);

// document.querySelector('#root');

run(render,App,root);


console.log("main.js has run.");