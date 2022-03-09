import Town from "./Town.js";
import { Visitor } from "./Visitor.js";
import {action, randomNum} from "./util.js";

const init = () => {
  const base = document.createElement("div");
  document.body.appendChild(base);
  base.style.height = `${document.documentElement.clientHeight}px`;
  base.style.width = `${document.documentElement.clientWidth}px`;

  const town = new Town(base);
  const LIMIT = 20;
  const num = randomNum(LIMIT);
  for (let i = 0; i < num; i++) {
    new Town();
  }
  town.render();
  const visitor = new Visitor(town, action);
};

init();
