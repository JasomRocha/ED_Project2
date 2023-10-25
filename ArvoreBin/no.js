// Define a classe No para representar os nós da árvore
class No {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

// Elementos HTML
const arvore = document.getElementById("arvore");
const titulo = document.getElementById("titulo");
const containerArvore = document.getElementById("container-arvore");
const caminhamentos = document.getElementById("caminhamentos");
let raiz = null;
const separacao = 250; // Aumentar a separação entre os nós

// Função para imprimir a árvore em ordem (para depuração)
function imprimirArvore(no) {
    const pilha = [];
    let atual = no;

    while (atual || pilha.length > 0) {
        while (atual) {
            console.log(atual.valor);
            pilha.push(atual);
            atual = atual.esquerda;
        }
        atual = pilha.pop();
        atual = atual.direita;
    }
}

// Função para criar um nó visual
function criarNoVisual(valor, x, y) {
    const no = document.createElement("div");
    no.className = "No";
    no.textContent = valor;
    no.style.left = x + "px";
    no.style.top = y + "px";
    no.setAttribute('data-valor', valor);
    return no;
}

// Função para adicionar um nó visual ao DOM
function adicionarNoVisual(pai, valor, x, y) {
    const novoNo = criarNoVisual(valor, x, y);
    pai.appendChild(novoNo);
    return novoNo;
}

// Função para criar uma representação visual da árvore
function criarArvoreVisual(raiz, x, y, separacao) {
    if (raiz) {
        const no = adicionarNoVisual(containerArvore, raiz.valor, x, y);
        criarArvoreVisual(raiz.esquerda, x - separacao, y + 100, separacao / 2);
        criarArvoreVisual(raiz.direita, x + separacao, y + 100, separacao / 2);
    }
}

// Função para remover um nó visual por valor
function removerNoPorValor(valor) {
    const nos = document.querySelectorAll('.No');
    for (const no of nos) {
        if (no.getAttribute('data-valor') === valor.toString()) {
            no.remove();
            return;
        }
    }
}

// Função para remover um nó da árvore por valor
function removerNo(raiz, valor) {
    if (raiz === null) {
        return raiz;
    }

    if (valor < raiz.valor) {
        raiz.esquerda = removerNo(raiz.esquerda, valor);
    } else if (valor > raiz.valor) {
        raiz.direita = removerNo(raiz.direita, valor);
    } else {
        if (raiz.esquerda === null && raiz.direita === null) {
            return null;
        } else if (raiz.esquerda === null) {
            return raiz.direita;
        } else if (raiz.direita === null) {
            return raiz.esquerda;
        } else {
            const valorMinimo = encontrarValorMinimo(raiz.direita);
            raiz.valor = valorMinimo;
            raiz.direita = removerNo(raiz.direita, valorMinimo);
        }
    }

    removerNoPorValor(valor);

    return raiz;
}

// Função para encontrar o valor mínimo em uma subárvore
function encontrarValorMinimo(no) {
    while (no.esquerda !== null) {
        no = no.esquerda;
    }
    return no.valor;
}

// Evento de clique para adicionar um nó à árvore
document.getElementById("adicionarNo").addEventListener("click", () => {
    const valorNoInput = document.getElementById("valorNo");
    const valor = parseInt(valorNoInput.value);

    if (isNaN(valor)) {
        alert("Por favor, digite um número válido.");
        return;
    }

    if (!raiz) {
        raiz = new No(valor);
        adicionarNoVisual(containerArvore, valor, 500, 60);
    } else {
        inserirNo(raiz, valor, 500, 60, separacao);
    }

    valorNoInput.value = "";
    resetarCaminhamentos();
});

// Evento de clique para remover um nó da árvore
document.getElementById("removerNo").addEventListener("click", () => {
    const valorNoInput = document.getElementById("valorNo");
    const valor = parseInt(valorNoInput.value);

    if (isNaN(valor)) {
        alert("Por favor, digite um número válido.");
        return;
    }

    if (encontrarNo(raiz, valor)) {
        raiz = removerNo(raiz, valor);
        containerArvore.innerHTML = "";
        criarArvoreVisual(raiz, 500, 60, separacao);
        console.log("Árvore após remoção:");
        imprimirArvore(raiz);
    } else {
        alert("Valor não encontrado na árvore.");
    }

    valorNoInput.value = "";
    resetarCaminhamentos();
});

// Evento de clique para destacar um nó da árvore
document.getElementById("destacarNo").addEventListener("click", () => {
    const valorDestacarInput = document.getElementById("valorDestacar");
    const valorDestacar = parseInt(valorDestacarInput.value);

    if (isNaN(valorDestacar)) {
        alert("Por favor, digite um número válido.");
        return;
    }
    
    resetarDestaque();

    if (!encontrarNo(raiz, valorDestacar)) {
        alert("Valor não encontrado na árvore.");
    } else {
        destacarNo(raiz, valorDestacar);
    }

    valorDestacarInput.value = "";
});

// Evento DOM de clique para executar um caminhamento na árvore
document.getElementById("executarCaminhamento").addEventListener("click", () => {
    const caminhamentoSelecionado = document.getElementById("caminhamentoSelecionado").value;
    const caminho = executarCaminhamento(raiz, caminhamentoSelecionado);
    caminhamentos.textContent = caminho.join(" -> ");
});

// Função para destacar um nó com um valor específico na árvore
function destacarNo(no, valorDestacar) {
    if (no) {
        if (no.valor === valorDestacar) {
            destacarNoVisual(no.valor);
        }
        destacarNo(no.esquerda, valorDestacar);
        destacarNo(no.direita, valorDestacar);
    }
}

// Função para destacar visualmente um nó
function destacarNoVisual(valor) {
    const noDestacado = document.querySelector(`[data-valor="${valor}"]`);
    if (noDestacado) {
        noDestacado.classList.add('destacado');
    }
}

// Função para redefinir o destaque de nós
function resetarDestaque() {
    const Destacados = document.querySelectorAll('.destacado');
    Destacados.forEach((no) => {
        no.classList.remove('destacado');
    });
}

// Função para inserir um novo nó na árvore
function inserirNo(no, valor, x, y, separacao) {
    if (valor < no.valor) {
        if (no.esquerda) {
            inserirNo(no.esquerda, valor, x - separacao, y + 100, separacao / 2);
        } else {
            no.esquerda = new No(valor);
            adicionarNoVisual(containerArvore, valor, x - separacao, y + 100);
        }
    } else if (valor > no.valor) {
        if (no.direita) {
            inserirNo(no.direita, valor, x + separacao, y + 100, separacao / 2);
        } else {
            no.direita = new No(valor);
            adicionarNoVisual(containerArvore, valor, x + separacao, y + 100);
        }
    } else {
        alert("O valor já existe na árvore.");
    }
}

// Função para encontrar um nó com um valor específico na árvore
function encontrarNo(no, valor) {
    if (no === null) {
            alert("Valor não encontrado na árvore.");
        return false;
    }

    if (valor < no.valor) {
        return encontrarNo(no.esquerda, valor);
    } else if (valor > no.valor) {
        return encontrarNo(no.direita, valor);
    } else {
        return true;
    }
}

// Função para redefinir a exibição dos caminhamentos
function resetarCaminhamentos() {
    caminhamentos.textContent = "";
}

// Funções para executar um caminhamento na árvore (Pré-Ordem, In-Ordem, Pós-Ordem)
function executarCaminhamento(raiz, tipo) {
    const caminho = [];
    function preOrdem(no) {
        if (no) {
            caminho.push(no.valor);
            preOrdem(no.esquerda);
            preOrdem(no.direita);
        }
    }
    function inOrdem(no) {
        if (no) {
            inOrdem(no.esquerda);
            caminho.push(no.valor);
            inOrdem(no.direita);
        }
    }
    function posOrdem(no) {
        if (no) {
            posOrdem(no.esquerda);
            posOrdem(no.direita);
            caminho.push(no.valor);
        }
    }

    switch (tipo) {
        case "preordem":
            preOrdem(raiz);
            break;
        case "inordem":
            inOrdem(raiz);
            break;
        case "posordem":
            posOrdem(raiz);
            break;
    }

    return caminho;
}
