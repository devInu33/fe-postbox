export class Mailbox{
    size;
    el;
    constructor(town,size) {
        this.size=size;
        this.town = town;
        this.el= town.element
    }
    render(){
        const box = this.el.createElement('div')
        box.style.width =`${this.el.width/2}px`;
        box.style.height =`${this.el.height/2}px`;
    }
}