const chaveEl = document.getElementById("chave")
const chaveInversaEl = document.getElementById("chave-inversa")
const mEl = document.getElementById("m")
const cEl = document.getElementById("c")
const matrizes = document.querySelectorAll(".matriz")

mTextoEl = document.getElementById("m-texto")
cTextoEl = document.getElementById("c-texto")

const btn2x2El = document.getElementById("2x2")
const btn3x3El = document.getElementById("3x3")

const btnMMaisEl = document.getElementById("m-mais")
const btnMMenosEl = document.getElementById("m-menos")
const btnCMaisEl = document.getElementById("c-mais")
const btnCMenosEl = document.getElementById("c-menos")

const inputMTexto = document.getElementById('m-texto');
const btnMTexto = document.getElementById('btn-m-texto');
const imgBtnMTexto = btnMTexto.querySelector('img');
const inputCTexto = document.getElementById('c-texto');
const btnCTexto = document.getElementById('btn-c-texto');
const imgBtnCTexto = btnCTexto.querySelector('img');

const alertaMEl = document.getElementById("m-alerta")
const alertaCEl = document.getElementById("c-alerta")
const alertaCIEl = document.getElementById("ci-alerta")
const alertaCHEl = document.getElementById("ch-alerta")
const alertaDetEl = document.getElementById("det-alerta")

const btnCifrarEl = document.getElementById("cifrar")
const btnDecodificarEl = document.getElementById("decodificar")
const btnCalcInversaEl = document.getElementById("calc-inversa")
const btnCalcChaveEl = document.getElementById("calc-chave")
const btnLimparEl = document.getElementById("limpar-tudo")

const btnModoEl = document.getElementById("modo")
const btnOrdemEl = document.getElementById("ordem-preenchimento")
const brutoMEl = document.getElementById("m-bruto")
const brutoCEl = document.getElementById("c-bruto")

let modoModular = true;
let ordemPreenchimento = "coluna"; // "coluna": próxima letra abaixo | "linha": próxima letra ao lado
let ultimoBrutoM = null; // resultado de K^-1 * C antes do módulo
let ultimoBrutoC = null; // resultado de K * M antes do módulo

function atualizarBotaoModo() {
    if (!btnModoEl) return;
    if (modoModular) {
        btnModoEl.textContent = "Mod 26";
        btnModoEl.title = "Modo de inversão da matriz: Mod 26";
    } else {
        btnModoEl.textContent = "Normal";
        btnModoEl.title = "Modo de inversão da matriz: Normal (sem aplicar mod 26)";
    }
}

function atualizarBotaoOrdem() {
    if (!btnOrdemEl) return;
    if (ordemPreenchimento === "coluna") {
        btnOrdemEl.textContent = "↓";
        btnOrdemEl.title = "Ordem de preenchimento: vertical";
    } else {
        btnOrdemEl.textContent = "→";
        btnOrdemEl.title = "Ordem de preenchimento: horizontal";
    }
}

if (btnModoEl) {
    btnModoEl.addEventListener("click", () => {
        modoModular = !modoModular;
        atualizarBotaoModo();
    });
    atualizarBotaoModo();
}

if (btnOrdemEl) {
    btnOrdemEl.addEventListener("click", () => {
        ordemPreenchimento = ordemPreenchimento === "coluna" ? "linha" : "coluna";
        atualizarBotaoOrdem();
    });
    atualizarBotaoOrdem();
}

function atualizarMatrizBruta(containerEl, matrizMatematica) {
    if (!containerEl) return;
    containerEl.innerHTML = "";
    if (!matrizMatematica) return;

    const linhas = matrizMatematica.length;
    containerEl.className = `matriz${linhas} matriz-bruta`;

    const colunas = math.transpose(matrizMatematica);
    colunas.flat().forEach(val => {
        const celula = document.createElement("input");
        celula.type = "text";
        celula.disabled = true;
        celula.classList.add("celula");
        celula.value = Number.isInteger(val) ? val : Math.round(val * 10000) / 10000;
        containerEl.appendChild(celula);
    });
}

function limparTudo() {
    inputMTexto.value = "";
    inputCTexto.value = "";

    inputMTexto.disabled = true;
    imgBtnMTexto.src = '../imgs/pencil.png';
    imgBtnMTexto.alt = 'Editar';
    
    inputCTexto.disabled = true;
    imgBtnCTexto.src = '../imgs/pencil.png';
    imgBtnCTexto.alt = 'Editar';

    document.querySelectorAll(".matriz input").forEach(input => {
        input.value = "";
    });

    if (brutoMEl) brutoMEl.innerHTML = "";
    if (brutoCEl) brutoCEl.innerHTML = "";
    ultimoBrutoM = null;
    ultimoBrutoC = null;

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
    const ordem = matrizEl.classList.contains("matriz2") ? 2 : 3;
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

btn2x2El.addEventListener("click", () => ajustarTamanhoMatrizes(2));
btn3x3El.addEventListener("click", () => ajustarTamanhoMatrizes(3));

btnMMaisEl.addEventListener("click", () => { adicionarColuna(mEl); })
btnMMenosEl.addEventListener("click", () => { removerColuna(mEl); })
btnCMaisEl.addEventListener("click", () => { adicionarColuna(cEl); })
btnCMenosEl.addEventListener("click", () => { removerColuna(cEl); })

const alfabetoHill = "abcdefghijklmnopqrstuvwxyz";

function letraParaNumero(letra) {
    return alfabetoHill.indexOf(letra) + 1;
}

function numeroParaLetra(numero) {
    const idx = Math.round(numero) - 1;
    return alfabetoHill[idx] || '';
}

function indiceParaDom(indice, linhas, colunas) {
    if (ordemPreenchimento === "linha") {
        const r = Math.floor(indice / colunas);
        const c = indice % colunas;
        return c * linhas + r;
    }
    return indice;
}

function preencherTextoNaMatriz(matrizEl, numeros) {
    const linhas = matrizEl.classList.contains("matriz2") ? 2 : 3;
    const colunas = Math.max(1, Math.ceil(numeros.length / linhas));
    const totalCelulas = Math.max(linhas * colunas, linhas * linhas);

    while (matrizEl.querySelectorAll('input').length < totalCelulas) {
        adicionarColuna(matrizEl);
    }
    while (matrizEl.querySelectorAll('input').length > totalCelulas) {
        removerColuna(matrizEl);
    }

    const inputsMatriz = matrizEl.querySelectorAll('input');
    inputsMatriz.forEach(input => { input.value = 1; });

    numeros.forEach((numero, indice) => {
        const domIndex = indiceParaDom(indice, linhas, colunas);
        inputsMatriz[domIndex].value = numero;
    });
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
        const numeros = texto.split('').map(char => letraParaNumero(char));
        const matrizEl = document.getElementById('c');

        preencherTextoNaMatriz(matrizEl, numeros);
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
        const numeros = texto.split('').map(char => letraParaNumero(char));
        const matrizEl = document.getElementById('m');

        preencherTextoNaMatriz(matrizEl, numeros);
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

function mod26(n) {
    const r = ((Math.round(n) - 1) % 26 + 26) % 26;
    return r + 1;
}

function inversoModular(a, m) {
    a = ((Math.round(a) % m) + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return 1; 
}

function multiplicarMatrizes(matrizA, matrizB, destino) {
    const produto = math.multiply(matrizA, matrizB);

    if (destino === "c") ultimoBrutoC = produto;
    if (destino === "m") ultimoBrutoM = produto;

    return produto.map(linha => linha.map(val => mod26(val)));
}

function calcularInversaModular(matriz) {
    const d = Math.round(math.det(matriz));
    const detMod = ((d % 26) + 26) % 26;
    const invDet = inversoModular(detMod, 26);

    const invReal = math.inv(matriz);
    const adjunta = math.multiply(d, invReal);

    return adjunta.map(linha => linha.map(val => mod26(val * invDet)));
}

function calcularInversaNormal(matriz) {
    return math.inv(matriz);
}

function calcularMatrizInversaParaExibicao(matriz) {
    return modoModular ? calcularInversaModular(matriz) : calcularInversaNormal(matriz);
}

function matrizParaTexto(matrizMatematica) {
    let numeros;
    if (ordemPreenchimento === "linha") {
        numeros = matrizMatematica.flat();
    } else {
        const colunas = math.transpose(matrizMatematica);
        numeros = colunas.flat();
    }
    return numeros.map(num => numeroParaLetra(num)).join('');
}

function lerMatrizDoDOM(matrizEl) {
    const matrizColunas = pegarMatriz(matrizEl);
    return math.transpose(matrizColunas);
}

function preencherMatrizUI(matrizEl, matrizMatematica) {
    const colunas = math.transpose(matrizMatematica);
    const valores = colunas.flat();
    
    while (matrizEl.querySelectorAll('input').length < valores.length) {
        adicionarColuna(matrizEl);
    }
    
    const ordem = matrizEl.classList.contains("matriz2") ? 2 : 3;
    while (matrizEl.querySelectorAll('input').length > Math.max(valores.length, ordem * ordem)) {
        removerColuna(matrizEl);
    }

    const inputs = matrizEl.querySelectorAll('input');
    inputs.forEach((input, index) => {
        if (index < valores.length) {
            const val = valores[index];
            input.value = Number.isInteger(val) ? val : Math.round(val * 10000) / 10000;
        } else {
            input.value = "";
        }
    });
}

function preencherTextoUI(inputEl, texto) {
    inputEl.value = texto;
}

function cifrar() {
    const K = lerMatrizDoDOM(chaveEl);
    const M = lerMatrizDoDOM(mEl);
    
    const C = multiplicarMatrizes(K, M, "c");
    
    preencherMatrizUI(cEl, C);
    preencherTextoUI(inputCTexto, matrizParaTexto(C));
    atualizarMatrizBruta(brutoCEl, ultimoBrutoC);
}

function decodificar() {
    const K = lerMatrizDoDOM(chaveEl);
    const C = lerMatrizDoDOM(cEl);
    
    const Kinv = calcularInversaModular(K);
    const M = multiplicarMatrizes(Kinv, C, "m");
    
    preencherMatrizUI(mEl, M);
    preencherTextoUI(inputMTexto, matrizParaTexto(M));
    atualizarMatrizBruta(brutoMEl, ultimoBrutoM);
}

function calcChaveInversa() {
    const K = lerMatrizDoDOM(chaveEl);
    const KinvExibicao = calcularMatrizInversaParaExibicao(K);
    
    preencherMatrizUI(chaveInversaEl, KinvExibicao);
}

function calcChave() {
    const Kinv = lerMatrizDoDOM(chaveInversaEl);
    const K = calcularMatrizInversaParaExibicao(Kinv); 
    
    preencherMatrizUI(chaveEl, K);
}