import Town from "./Town.js";
import {Visitor} from "./Visitor.js";
import { action } from "./util.js";

const init = () => {
  const base =document.createElement('div')
  document.body.appendChild(base);
  base.style.height = `${document.documentElement.clientHeight}px`;
  base.style.width = `${document.documentElement.clientWidth}px`;
  const town = new Town(base);

  town.render();

  const visitor = new Visitor();
  const info = document.createElement('div');
  const button = document.createElement("button");
  button.innerText = `빨간 우체통 확인`;
  info.appendChild(button);
  info.classList.add('info');
  button.classList.add('redbutton');
  document.body.appendChild(info);

  button.addEventListener("click", () => {
    visitor.visit(town, action);
    visitor.print();
  });
};

init();
