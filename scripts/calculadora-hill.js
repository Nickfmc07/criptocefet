/* Matrizes */
const chaveEl = document.getElementById("chave")
const chaveInversaEl = document.getElementById("chave-inversa")
const mEl = document.getElementById("m")
const cEl = document.getElementById("c")
const matrizes = document.querySelectorAll(".matriz")

/* Inputs de texto */
mTextoEl = document.getElementById("m-texto")
cTextoEl = document.getElementById("c-texto")

/* Botões para mudar a ordem das matrizes */
const btn2x2El = document.getElementById("2x2")
const btn3x3El = document.getElementById("3x3")

/* Botões para adicionar/remover colunas */
const btnMMaisEl = document.getElementById("m-mais")
const btnMMenosEl = document.getElementById("m-menos")
const btnCMaisEl = document.getElementById("c-mais")
const btnCMenosEl = document.getElementById("c-menos")

/* Botões para habilitar a edição de texto e inputs*/
const inputMTexto = document.getElementById('m-texto');
const btnMTexto = document.getElementById('btn-m-texto');
const imgBtnMTexto = btnMTexto.querySelector('img');
const inputCTexto = document.getElementById('c-texto');
const btnCTexto = document.getElementById('btn-c-texto');
const imgBtnCTexto = btnCTexto.querySelector('img');

/* Alerta de preenchimento inválido */
const alertaMEl = document.getElementById("m-alerta")
const alertaCEl = document.getElementById("c-alerta")
const alertaCIEl = document.getElementById("ci-alerta")
const alertaCHEl = document.getElementById("ch-alerta")
const alertaDetEl = document.getElementById("det-alerta")

/* Botões Principais */
const btnCifrarEl = document.getElementById("cifrar")
const btnDecodificarEl = document.getElementById("decodificar")
const btnCalcInversaEl = document.getElementById("calc-inversa")
const btnCalcChaveEl = document.getElementById("calc-chave")
const btnLimparEl = document.getElementById("limpar-tudo")

function limparTudo() {
    // Limpar os campos de texto contínuo
    inputMTexto.value = "";
    inputCTexto.value = "";

    // Restaurar os inputs de texto para o modo bloqueado (ícone de lápis)
    inputMTexto.disabled = true;
    imgBtnMTexto.src = '../imgs/pencil.png';
    imgBtnMTexto.alt = 'Editar';
    
    inputCTexto.disabled = true;
    imgBtnCTexto.src = '../imgs/pencil.png';
    imgBtnCTexto.alt = 'Editar';

    // Limpar os valores de todas as matrizes
    document.querySelectorAll(".matriz input").forEach(input => {
        input.value = "";
    });

    // Esconder todos os alertas
    alertaMEl.classList.add("hidden");
    alertaCEl.classList.add("hidden");
    alertaCIEl.classList.add("hidden");
    alertaCHEl.classList.add("hidden");
    alertaDetEl.classList.add("hidden");
}

function pegarMatriz2(matrizEl) {
    let matriz = []
    for (let i = 0; i < matrizEl.children.length; i+=2) {
        let coluna = []
        coluna[0] = matrizEl.children[i].value
        coluna[1] = matrizEl.children[i+1].value
        matriz.push(coluna)
    }
    return matriz
}

function pegarMatriz3(matrizEl) {
    let matriz = []
    for (let i = 0; i < matrizEl.children.length; i+=3) {
        let coluna = []
        coluna[0] = matrizEl.children[i].value
        coluna[1] = matrizEl.children[i+1].value
        coluna[2] = matrizEl.children[i+2].value
        matriz.push(coluna)
    }
    return matriz
}

function pegarMatriz(matrizEl) {
    if (matrizEl.classList.contains("matriz2"))
        return pegarMatriz2(matrizEl)
    else
        return pegarMatriz3(matrizEl)
}

function adicionarColuna(matrizEl) {
    let ordem = 2
    if (matrizEl.classList.contains("matriz3"))
        ordem = 3 
    for (let i = 0; i < ordem; i++) {
        const input = document.createElement("input")
        input.type = "number"
        input.classList.add("celula")
        
        matrizEl.appendChild(input)
    }
}

function removerColuna(matrizEl) {
    const ordem = matrizEl.classList.contains("matriz2") ? 2 : 3;
    if (matrizEl.children.length > ordem) {
        for (let i = 0; i < ordem; i++) {
            matrizEl.removeChild(matrizEl.lastElementChild);
        }
    }
}

function ajustarTamanhoMatrizes(ordem) {
    matrizes.forEach(m => {
        m.innerHTML = "";
        m.className = `matriz matriz${ordem} matriz`;
        for (let i = 0; i < ordem * ordem; i++) {
            const input = document.createElement("input");
            input.type = "number";
            input.classList.add("celula");
            m.appendChild(input);
        }
    });
}

function preenchimentoValido(matrizEl) {
    const inputs = matrizEl.querySelectorAll('input');
    for (let input of inputs) {
        if (input.value.trim() === "") {
            return false;
        }
    }
    return true;
}

function determinanteValido() {
    const matriz = pegarMatriz(chaveEl);
    const d = Math.round(math.det(matriz));
    const detMod = ((d % 26) + 26) % 26;

    if (detMod === 0) return false;
    return math.gcd(detMod, 26) === 1;
}

/* Atribuindo funções aos botões */
btn2x2El.addEventListener("click", () => ajustarTamanhoMatrizes(2));
btn3x3El.addEventListener("click", () => ajustarTamanhoMatrizes(3));

btnMMaisEl.addEventListener("click", () => { adicionarColuna(mEl); })
btnMMenosEl.addEventListener("click", () => { removerColuna(mEl); })
btnCMaisEl.addEventListener("click", () => { adicionarColuna(cEl); })
btnCMenosEl.addEventListener("click", () => { removerColuna(cEl); })

const alfabetoHill = "abcdefghijklmnopqrstuvwxyz";

function adicionarColuna(matrizEl) {
    const ordem = matrizEl.classList.contains("matriz2") ? 2 : 3;
    for (let i = 0; i < ordem; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.classList.add("celula");
        matrizEl.appendChild(input);
    }
}

btnCTexto.addEventListener('click', () => {
    if (inputCTexto.disabled) {
        inputCTexto.disabled = false;
        imgBtnCTexto.src = '../imgs/check.png';
        imgBtnCTexto.alt = 'Confirmar';
        inputCTexto.focus();
    } else {
        inputCTexto.disabled = true;
        imgBtnCTexto.src = '../imgs/pencil.png';
        imgBtnCTexto.alt = 'Editar';
        
        const texto = inputCTexto.value.toLowerCase().replace(/[^a-z]/g, '');
        const numeros = texto.split('').map(char => alfabetoHill.indexOf(char));
        const matrizEl = document.getElementById('c');
        const ordem = matrizEl.classList.contains('matriz2') ? 2 : 3;
        
        while (matrizEl.querySelectorAll('input').length < numeros.length) {
            adicionarColuna(matrizEl);
        }

        const inputsMatriz = matrizEl.querySelectorAll('input');
        inputsMatriz.forEach((input, index) => {
            input.value = index < numeros.length ? numeros[index] : 0;
        });
    }
});

btnMTexto.addEventListener('click', () => {
    if (inputMTexto.disabled) {
        inputMTexto.disabled = false;
        imgBtnMTexto.src = '../imgs/check.png';
        imgBtnMTexto.alt = 'Confirmar';
        inputMTexto.focus();
    } else {
        inputMTexto.disabled = true;
        imgBtnMTexto.src = '../imgs/pencil.png';
        imgBtnMTexto.alt = 'Editar';
        
        const texto = inputMTexto.value.toLowerCase().replace(/[^a-z]/g, '');
        const numeros = texto.split('').map(char => alfabetoHill.indexOf(char));
        const matrizEl = document.getElementById('m');
        const ordem = matrizEl.classList.contains('matriz2') ? 2 : 3;

        while (matrizEl.querySelectorAll('input').length < numeros.length) {
            adicionarColuna(matrizEl);
        }

        const inputsMatriz = matrizEl.querySelectorAll('input');
        inputsMatriz.forEach((input, index) => {
            input.value = index < numeros.length ? numeros[index] : 0;
        });
    }
});

btnCifrarEl.addEventListener("click", ()=> {
    if (!preenchimentoValido(mEl)) {
        alertaMEl.classList.remove("hidden")
        return
    } else
        alertaMEl.classList.add("hidden")
    cifrar()
})

btnDecodificarEl.addEventListener("click", ()=> {
    if (!preenchimentoValido(cEl)) {
        alertaCEl.classList.remove("hidden")
        return
    } else
        alertaCEl.classList.add("hidden")
    decodificar()
})

btnCalcInversaEl.addEventListener("click", ()=> {
    if (!preenchimentoValido(chaveEl)) {
        alertaCIEl.classList.remove("hidden")
        return
    } else
        alertaCIEl.classList.add("hidden")
    if (!determinanteValido(chaveEl)) {
        alertaDetEl.classList.remove("hidden")
        return
    } else
        alertaDetEl.classList.add("hidden")
    calcChaveInversa()
})

btnCalcChaveEl.addEventListener("click", ()=> {
    if (!preenchimentoValido(chaveInversaEl)) {
        alertaCHEl.classList.remove("hidden")
        return
    } else
        alertaCHEl.classList.add("hidden")
    calcChave()
})

btnLimparEl.addEventListener("click", limparTudo);

/* ========================================================
   1. Funções Matemáticas Auxiliares (Lógica Pura)
======================================================== */

// Garante que o número fique positivo no módulo 26
function mod26(n) {
    return ((Math.round(n) % 26) + 26) % 26;
}

// Calcula o inverso modular de um número (ex: inverso do determinante)
function inversoModular(a, m) {
    a = mod26(a);
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return 1; 
}

// Multiplica duas matrizes aplicando o módulo 26 a cada elemento
function multiplicarMatrizesMod26(matrizA, matrizB) {
    const produto = math.multiply(matrizA, matrizB);
    return produto.map(linha => linha.map(val => mod26(val)));
}

// Calcula a matriz inversa modular (K^-1 mod 26)
function calcularMatrizInversaMod26(matriz) {
    const d = Math.round(math.det(matriz));
    const detMod = mod26(d);
    const invDet = inversoModular(detMod, 26);
    
    // Math.inv dá a inversa real, multiplicamos pelo determinante para ter a adjunta
    const invReal = math.inv(matriz);
    const adjunta = math.multiply(d, invReal);
    
    // (Adjunta * Inverso do Determinante) mod 26
    return adjunta.map(linha => linha.map(val => mod26(val * invDet)));
}

/* ========================================================
   2. Funções de Interface (DOM <-> Matemática)
======================================================== */

// Converte a matriz matemática (array de linhas) num texto contínuo
function matrizParaTexto(matrizMatematica) {
    // Lemos a matriz por colunas para formar o texto
    const colunas = math.transpose(matrizMatematica);
    const numeros = colunas.flat();
    return numeros.map(num => alfabetoHill[num] || '').join('');
}

// Pega os dados do DOM e transforma numa matriz real para o math.js
function lerMatrizDoDOM(matrizEl) {
    // pegarMatriz() retorna array de colunas. Transpomos para termos matriz de linhas.
    const matrizColunas = pegarMatriz(matrizEl);
    return math.transpose(matrizColunas);
}

// Recebe uma matriz matemática e preenche os inputs do HTML visualmente
function preencherMatrizUI(matrizEl, matrizMatematica) {
    // Transpomos de volta para colunas (ordem visual do grid no HTML)
    const colunas = math.transpose(matrizMatematica);
    const valores = colunas.flat();
    
    // Garante que temos inputs suficientes para colocar todos os valores
    while (matrizEl.querySelectorAll('input').length < valores.length) {
        adicionarColuna(matrizEl);
    }
    
    // Limpa colunas em excesso (opcional para visual mais limpo)
    const ordem = matrizEl.classList.contains("matriz2") ? 2 : 3;
    while (matrizEl.querySelectorAll('input').length > Math.max(valores.length, ordem * ordem)) {
        removerColuna(matrizEl);
    }

    // Preenche os valores
    const inputs = matrizEl.querySelectorAll('input');
    inputs.forEach((input, index) => {
        if (index < valores.length) {
            input.value = valores[index];
        } else {
            input.value = ""; // Limpa células não usadas se sobrarem
        }
    });
}

function preencherTextoUI(inputEl, texto) {
    inputEl.value = texto;
}

/* ========================================================
   3. Funções Principais (Acionadas pelos Botões)
======================================================== */

function cifrar() {
    const K = lerMatrizDoDOM(chaveEl);
    const M = lerMatrizDoDOM(mEl);
    
    // C = K * M (mod 26)
    const C = multiplicarMatrizesMod26(K, M);
    
    preencherMatrizUI(cEl, C);
    preencherTextoUI(inputCTexto, matrizParaTexto(C));
}

function decodificar() {
    const K = lerMatrizDoDOM(chaveEl);
    const C = lerMatrizDoDOM(cEl);
    
    // M = K^-1 * C (mod 26)
    const Kinv = calcularMatrizInversaMod26(K);
    const M = multiplicarMatrizesMod26(Kinv, C);
    
    preencherMatrizUI(mEl, M);
    preencherTextoUI(inputMTexto, matrizParaTexto(M));
}

function calcChaveInversa() {
    const K = lerMatrizDoDOM(chaveEl);
    const Kinv = calcularMatrizInversaMod26(K);
    
    preencherMatrizUI(chaveInversaEl, Kinv);
}

function calcChave() {
    const Kinv = lerMatrizDoDOM(chaveInversaEl);
    // A inversa da inversa é a própria matriz original
    const K = calcularMatrizInversaMod26(Kinv); 
    
    preencherMatrizUI(chaveEl, K);
}