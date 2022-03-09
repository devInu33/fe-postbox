import Town from "./Town.js";
import { Visitor } from "./Visitor.js";
import { action, randomNum, randomChars } from "./util.js";

const init = () => {
  const base = document.createElement("div");
  document.body.appendChild(base);
  base.style.height = `${document.documentElement.clientHeight}px`;
  base.style.width = `${document.documentElement.clientWidth}px`;


  const town = new Town("BASE", base);

  const num = randomNum(20);
  for (let i = 0; i < num; i++) {
    new Town(randomChars[i + 1]);
  }
  town.render();
  const visitor = new Visitor(town, action);
};

init();
