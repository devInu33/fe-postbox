import {randomNum} from "./util.js";

export class Model {
    parent;
    el = document.createElement("div");
    children = new Set();
    static objects = new Set();
    static boxes = new Set();

    constructor(parent = undefined) {
        this.parent = parent;
        Model.objects.add(this);
    }

    render() {
        Model.objects.delete(this);
        let num = randomNum(Model.objects.size);
        this.el.style.height = this.parent ?
            `${Math.floor(parseInt(this.parent.el.style.height) / num)}px`
            : `${document.documentElement.clientHeight}px`;
        this.el.style.width = this.parent ? `${Math.floor(parseInt(this.parent.el.style.width) / num)}px`
            : `${document.documentElement.clientWidth}px`;
        this.parent?.children.add(this);
        this._render();
    }

    _render() {
        throw "Override";
    }
}
