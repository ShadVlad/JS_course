"use strict";

function DomElement(selector, styles) {
  this.selector = selector;
  //styles = styles || {};
  this.styles = styles;
}

DomElement.prototype.createEl = function () {
  let newElement;
  if (this.selector[0] === ".") {
    newElement = document.createElement("div");
    newElement.classList.add(this.selector.slice(1));
  } else {
    newElement = document.createElement("p");
    newElement.setAttribute("id", this.selector.slice(1));
  }
  console.log("newElement: ", newElement);
  const divNew = document.getElementById("div");
  console.log("divNew: ", divNew);
  newElement.innerHTML = "bgiuypmhpiohniphm,      puiohpjn        ouhnpuiohn";
  newElement.style.cssText = this.styles;
  console.log("this.styles: ", this.styles);
  divNew.appendChild(newElement);
};
let cssString =
  "height: 200px; width: 600px; background-color: green; font-size: 20px;";

let domElem = new DomElement(".block", cssString);
domElem.createEl();
