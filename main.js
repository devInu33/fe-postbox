import Town from "./Town.js";
import { ModelVisitor } from "./Visitor.js";
import { randomNum, randomChars } from "./util.js";
import { CheckButton } from "./CheckButton.js";
import Scanner from "./Scanner.js";

const init = () => {
  const base = document.createElement("div");
  document.body.appendChild(base);

  const town = new Town("BASE");

  const num = randomNum(20);
  for (let i = 0; i < num; i++) {
    new Town(randomChars[i + 1]);
  }
  new CheckButton();
  town.render();
  const scanner = new Scanner(new ModelVisitor());
  scanner.scan(town);
};

init();
