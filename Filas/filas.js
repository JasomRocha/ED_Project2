const queue = [];
let queueSize = 0;

let queueSizeSet = false;

function setQueueSize() {
    if (queueSizeSet) {
        alert("O tamanho da fila já foi definido. Não é possível alterá-lo.");
        return;
    }

  }  



  function setQueueSize() {
      if (queueSizeSet) {
          alert("O tamanho da fila já foi definido. Não é possível alterá-lo.");
          return;
      }
  
      const size = parseInt(document.getElementById("queue-size").value);
      if (!isNaN(size) && size >= 0) {
          queueSize = size;
          queue.length = size;
          displayQueue();
          queueSizeSet = true; // Marca que o tamanho da fila foi definido
          document.getElementById("queue-size").disabled = true; // Desativa o campo
      } 
  }



function enqueue() {
  const inputValue = document.getElementById("input").value;
  if (inputValue.trim() !== "") {
      const emptyIndex = queue.findIndex(element => element === undefined);
      if (emptyIndex !== -1) {
          queue[emptyIndex] = inputValue;
          displayQueue();
      } else {
          alert("A fila está cheia. Não é possível adicionar mais elementos.");
      }
  }
}

function dequeue() {
  if (queue.length > 0 && queue[0] !== undefined) {
      const removedElement = queue.shift(); // Remove o primeiro elemento da fila
      queue.push(undefined); // Adiciona um espaço em branco no final da fila
      displayQueue();
      return removedElement;
  } else {
      alert("A fila está vazia. Não é possível desenfileirar.");
  }
}
function displayQueue() {
    const queueContainer = document.getElementById("queue");

    // Limpe a fila atual
    queueContainer.innerHTML = "";

    // Adicione os blocos à fila
    for (let i = 0; i < queue.length; i++) {
        const queueBox = document.createElement("div");
        queueBox.classList.add("queue-box");
        queueBox.textContent = queue[i] || "";
        queueContainer.appendChild(queueBox);
    }
}

function consultarPrimeiroElemento() {
    const frontElementDisplay = document.getElementById("front-element");
    if (queue.length > 0 && queue[0] !== undefined) {
        frontElementDisplay.value = queue[0];
    } else {
        frontElementDisplay.value = "Fila vazia";
    }
}
document.addEventListener("DOMContentLoaded", function () {
  // Chame setQueueSize apenas após o carregamento da página
  setQueueSize();
});