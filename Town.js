import {Model} from "./Model.js";
import {randomBoolean, randomNum} from "./util.js";
import {Mailbox} from "./Mailbox.js";

export default class Town extends Model {
    mailBox = null;
    name;
    #next = null;

    constructor(name = undefined, parent = null) {
        super(parent);
        this.name = name;
    }

    // next(v){
    //   this.#next = v;
    //   v.parent = this.parent;
    //   return this.#next;
    // }
    _render() {
        let num = randomNum(Model.objects.size);
        console.log(num);
        this.el.classList.add("town");
        this.el.dataset["name"] = this.name;
        if (randomBoolean()) {
            new Mailbox(randomNum(num), this);
        }
        if (!Model.objects.size) return;
        //
        // while (num) {
        //     const arr = Array.from(Model.objects)
        //     if(arr.length) {
        //         const object = arr.pop()
        //         object.parent = this;
        //         object.render()
        //         num -= 1;
        //     }
        // }
        for (const object of Model.objects) {
          if (num) {
            object.parent = this;
            object.render();
            num-=1;
          }
        }
    }
}
