import Town from "./Town.js";
import Visitor from "./Visitor.js";
import { action } from "./util.js";

const init = () => {
  const town = new Town(document.body);
  town.render();

  const visitor = new Visitor();

  const button = document.createElement("button");
  body.appendChild(button);

  button.addEventListener("click", () => {
    visitor.visit(town, action);
    visitor.print();
  });
};

init();
