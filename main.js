import Town from "./Town.js";
import { DomVisitor, ModelVisitor } from "./Visitor.js";
import { randomNum, randomChars } from "./util.js";
import { CheckButton } from "./CheckButton.js";
import { DomScanner, ModelScanner } from "./Scanner.js";

const init = () => {
  const town = new Town("BASE");
  const num = randomNum(20);
  for (let i = 0; i < num; i++) {
    new Town(randomChars[i + 1]);
  }
  const onclick = () => new ModelScanner(new ModelVisitor()).scan(town);
  new CheckButton(onclick);
  town.render();

  const scanner = new DomScanner(new ModelVisitor());
  scanner.scan(town);
};

init();
