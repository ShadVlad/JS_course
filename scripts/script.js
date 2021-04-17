"use strict";

function DomElement(selector, styles) {
  this.selector = selector;
  styles = styles || {};
  this.height = styles.height;
  this.width = styles.width;
  this.bg = styles.bg;
  this.fontSize = styles.fontSize;
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
  newElement.style.cssText =
    "height: " +
    this.height +
    "; width: " +
    this.width +
    "; background-color: " +
    this.bg +
    "; font-size: " +
    this.fontSize;
  console.log("this.styles: ", newElement.style.cssText);
  divNew.appendChild(newElement);
};
let styles = {
  height: "100px",
  width: "500px",
  bg: "green",
  fontSize: "20px",
};
let domElem = new DomElement(".block", styles);
domElem.createEl();
