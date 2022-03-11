import {Model} from "./Model.js";
import {randomBoolean, randomNum} from "./util.js";
import {Mailbox} from "./Mailbox.js";

export default class Town extends Model {
    mailBox = null;
    name;
    constructor(name = undefined, parent = null) {
        super(parent);
        this.name = name;
    }


    _render() {
        let num = randomNum(Model.objects.size);

        parent? this.el.classList.add("town"): this.el.classList.add('base');
        this.el.dataset["name"] = this.name;
        if (randomBoolean()) {
            new Mailbox(randomNum(num), this);
        }
        if (!Model.objects.size) return;
        for (const object of Model.objects) {
            if (num<=0) return;
            object.parent= this;
            this.children.add(object);
            num-=1;
        }
        this.children.forEach(child=>child.render());
    }

}
