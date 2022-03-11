import Town from "./Town.js";
import { DomVisitor, ModelVisitor } from "./Visitor.js";
import { randomNum, randomChars } from "./util.js";
import { CheckButton } from "./CheckButton.js";
import {ButtonScanner, DomScanner, RenderScanner} from "./Scanner.js";

const init = () => {
  const town = new Town("BASE");

  const num = randomNum(20);
  for (let i = 0; i < num; i++) {
    new Town(randomChars[i + 1]);
  }

  const onclick = () => new ButtonScanner(new ModelVisitor()).scan(town);
  new CheckButton(onclick);
  town.render();

  const scanner = new RenderScanner(new ModelVisitor());
  scanner.scan(town);

};

init();
