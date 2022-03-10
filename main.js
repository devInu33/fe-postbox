import Town from "./Town.js";
import { ModelVisitor } from "./Visitor.js";
import { randomNum, randomChars } from "./util.js";
import { CheckButton } from "./CheckButton.js";
import Scanner, {DomScanner, ModelScanner} from "./Scanner.js";

const init = () => {

  const town = new Town("BASE");
  const num = randomNum(20);
  for (let i = 0; i < num; i++) {
    new Town(randomChars[i + 1]);
  }
  const onclick= ()=>new ModelScanner(new ModelVisitor()).scan(town)
  new CheckButton(onclick);
  town.render(); //town 구조를 만들어줌=> 자식 부모 데이터를 만듬
  const scanner = new DomScanner(new ModelVisitor()); //
  scanner.scan(town);
};

init();
