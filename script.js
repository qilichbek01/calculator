const klav = document.querySelector(".klav");
const h1 = document.querySelector("h1");
const p = document.querySelector("p");
const equil = document.querySelector(".equil");
const index = document.querySelector(".index")

// basicly part
//////////////////////////////////////////////////////
const raqamlar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
const amallar = ["+", "-", "*", "/", "d"];
const ochirishlar = ["del", "clr"];
let saqlagich = "";
klav.addEventListener("click", (e) => {
  let nishon = e.target;
  if (h1.textContent.length > 9) {
    h1.style.fontSize = "2rem";
  }
  if (h1.textContent.length < 9) {
    h1.style.fontSize = "5.6rem";
  }
  if (nishon.classList == "klav") {
    e.preventDefault();
  } else if (ochirishlar.some((elem) => elem == nishon.value)) {
    if (nishon.value == "del") {
      h1.textContent = h1.textContent.slice(0, -1);
      saqlagich = saqlagich.slice(0, -1);
    } else {
      h1.textContent = "";
      p.textContent = "";
      saqlagich = "";
    }
  } else if (
    amallar.some((elem) => elem == nishon.value) && amallar.every((elem) => elem != h1.textContent.at(-1)) && h1.textContent) {
    saqlagich = "";
    h1.textContent += nishon.value;
  } else if (raqamlar.some((elem) => elem == nishon.value) && saqlagich.length < 10
  ) {
    if (nishon.value == ".") {
      if (!saqlagich) {
        saqlagich += "0.";
        h1.textContent += "0.";
      } else if (!saqlagich.includes(".")) {
        saqlagich += ".";
        h1.textContent += ".";
      }
    } else {
      saqlagich += nishon.value;
      h1.textContent += nishon.value;
    }
  }
});
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
function calculator(str) {
  /////////////////////////////////////////
  const tokens = str.match(/(\d+\.\d+|\d+|[+\-*/d])/g);
  // Convert numeric strings to numbers
  const array = tokens.map((token) => {
    return isNaN(token) ? token : parseFloat(token);
  });
  ////////////////////////////////////////
  // daraja 1
  while (array.indexOf("d") != -1) {
    let index = array.indexOf("d");
    let num1 = array.splice(index - 1, 1);
    array.splice(index - 1, 1);
    let num2 = array.splice(index - 1, 1);
    array.splice(index - 1, 0, num1 ** num2);
  }
  // daraja 2
  ["*", "/"].forEach((elem) => {
    while (array.indexOf(elem) != -1) {
      let index = array.indexOf(elem);
      let num1 = array.splice(index - 1, 1);
      array.splice(index - 1, 1);
      let num2 = array.splice(index - 1, 1);
      array.splice(index - 1, 0, elem == "*" ? num1 * num2 : num1 / num2);
    }
  });
  ["+", "-"].forEach((elem) => {
    while (array.indexOf(elem) != -1) {
      let index = array.indexOf(elem);
      let num1 = array.splice(index - 1, 1);
      array.splice(index - 1, 1);
      let num2 = array.splice(index - 1, 1);
      array.splice(index - 1, 0, elem == "+" ? +num1 + +num2 : num1 - num2);
    }
  });
  p.textContent = h1.textContent;
  h1.textContent = array[0];
  if (h1.textContent.length < 9) {
    h1.style.fontSize = "5.6rem";
  }
}
///////////////////////////////////////////////////////////

equil.addEventListener("click", () => {
  calculator(h1.textContent);
});
////////////////////////////////////////////////////////////
let index1 = true;
let color = document.querySelector(".color")
index.addEventListener("click", () => {
  if (index1) {
    color.href = "./dark.css"
    index.textContent = "🌞"
    index1 = false;
  } else {
    color.href = "./light.css"
    index.textContent = "🌙"
    index1 = true;
  }
})