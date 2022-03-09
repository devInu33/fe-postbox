export class Mailbox {
  size;
  #parent;
  el = document.createElement("div");
  constructor(size, parent) {
    this.size = size;
    this.el.classList.add("mailbox");
    this.el.innerText = `📮`;
    this.el.dataset["size"] = size;
    this.#parent = parent;
  }

  render() {
    this.el.style.width = `${this.#parent.style.width / 2}px`;
    this.el.style.height = `${this.#parent.style.height / 2}px`;
    this.#parent.appendChild(this.el);
  }
}
