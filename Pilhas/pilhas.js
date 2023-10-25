const stack = [];
let stackSize = 0;

let stackSizeSet = false;

function setStackSize() {
    if (stackSizeSet) {
        alert("O tamanho da pilha já foi definido. Não é possível alterá-lo.");
        return;
    }

    const size = parseInt(document.getElementById("stack-size").value);
    if (!isNaN(size) && size >= 0) {
        stackSize = size;
        stack.length = size;
        displayStack();
        stackSizeSet = true; // Marca que o tamanho da pilha foi definido
        document.getElementById("stack-size").disabled = true; // Desativa o campo
    }
}

function pushElement() {
    const inputValue = document.getElementById("input").value;
    if (inputValue.trim() !== "") {
        const emptyIndex = stack.findIndex(element => element === undefined);
        if (emptyIndex !== -1) {
            stack[emptyIndex] = inputValue;
            displayStack();
        } else {
            alert("A pilha está cheia. Não é possível empilhar mais elementos.");
        }
    }
}

function popElement() {
  if (stack.length > 0) {
      let topIndex = -1;
      for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i] !== undefined) {
              topIndex = i;
              break;
          }
      }
      
      if (topIndex !== -1) {
          stack[topIndex] = undefined;
          displayStack();
      } else {
          alert("A pilha está vazia. Não é possível desempilhar.");
      }
  } else {
      alert("A pilha está vazia. Não é possível desempilhar.");
  }
}



function displayStack() {
    const stackContainer = document.getElementById("stack");

    // Limpe a pilha atual
    stackContainer.innerHTML = "";

    // Adicione os blocos à pilha
    for (let i = stack.length - 1; i >= 0; i--) {
        const stackBox = document.createElement("div");
        stackBox.classList.add("stack-box");
        stackBox.textContent = stack[i] || "";
        stackContainer.appendChild(stackBox);
    }
}

function peek() {
  const peekElement = document.getElementById("peek-element");
  if (stack.length > 0) {
      let topIndex = -1;
      for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i] !== undefined) {
              topIndex = i;
              break;
          }
      }
      
      if (topIndex !== -1) {
          peekElement.value = stack[topIndex];
      } else {
          peekElement.value = "Pilha vazia";
      }
  } else {
      peekElement.value = "Pilha vazia";
  }
}
document.addEventListener("DOMContentLoaded", function () {
    // Chame setStackSize apenas após o carregamento da página
    setStackSize();
});
