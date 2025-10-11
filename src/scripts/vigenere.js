const chaveEl = document.getElementById('chave')
const inputs = document.querySelectorAll('input')
const modoEl = document.getElementById('modo')
const mensagemEl = document.getElementById('mensagem')
const textoCifradoEl = document.getElementById('texto-cifrado')

function encrypt(key, textoOriginal) {
  if (key.length == 0) return textoOriginal
  let textoCifrado = ""
  for (let i = 0; i < textoOriginal.length; i++) {
    let c = textoOriginal[i]
    let keyIndex = i % key.length
    let keyNumber = key.charAt(keyIndex)
    keyNumber = keyNumber.toLowerCase()
    keyNumber = keyNumber.charCodeAt(0) - 97
    if (c >= 'a' && c <= 'z') {
      c = String.fromCharCode((c.charCodeAt(0) - 97 + keyNumber) % 26 + 97)
    } else if (c >= 'A' && c <= 'Z') {
      c = String.fromCharCode((c.charCodeAt(0) - 65 + keyNumber) % 26 + 65)
    }
    textoCifrado += c
  }
  return textoCifrado
}

function decryptC(key, textoCifrado) {
  if (key.length == 0) return textoCifrado
  let textoDecodificado = ""
  for (let i = 0; i < textoCifrado.length; i++) {
    let c = textoCifrado[i]
    let keyIndex = i % key.length
    let keyNumber = key.charAt(keyIndex)
    keyNumber = keyNumber.toLowerCase()
    keyNumber = keyNumber.charCodeAt(0) - 97
    if (c >= 'a' && c <= 'z') {
      c = String.fromCharCode((c.charCodeAt(0) - 97 - keyNumber + 26) % 26 + 97)
    } else if (c >= 'A' && c <= 'Z') {
      c = String.fromCharCode((c.charCodeAt(0) - 65 - keyNumber + 26) % 26 + 65)
    }
    textoDecodificado += c
  }
  return textoDecodificado
}

function trocarModo() {
  if (modoEl.checked) {
    // Modo: Decifrar
    mensagemEl.disabled = true;
    mensagemEl.placeholder = 'Texto decodificado';

    textoCifradoEl.disabled = false;
    textoCifradoEl.placeholder = 'Digite aqui o texto cifrado';
  } else {
    // Modo: Cifrar
    mensagemEl.disabled = false;
    mensagemEl.placeholder = 'Digite sua mensagem';

    textoCifradoEl.disabled = true;
    textoCifradoEl.placeholder = 'Texto cifrado';
  }
}

modoEl.addEventListener('change', () => {
  trocarModo()
})

inputs.forEach(input => {
  input.addEventListener('input', () => {
    if (modoEl.checked) {
      // Modo: Decifrar
      mensagemEl.value = decryptC(chaveEl.value, textoCifradoEl.value)
    }
    else{
      // Modo: Cifrar
      textoCifradoEl.value = encrypt(chaveEl.value, mensagemEl.value)
    }
  });
});

function gerarTabela() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const table = document.createElement("table");
  table.setAttribute("border", "1");
  table.setAttribute("cellpadding", "5");
  table.setAttribute("cellspacing", "0");
  table.className = "justify-center";

  // Cabeçalho
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const emptyTh = document.createElement("th");
  headerRow.appendChild(emptyTh);
  letras.forEach(letra => {
    const th = document.createElement("th");
    th.textContent = letra;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Corpo da tabela
  const tbody = document.createElement("tbody");
  letras.forEach((linhaLetra, i) => {
    const row = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = linhaLetra;
    row.appendChild(th);

    for (let j = 0; j < letras.length; j++) {
      const td = document.createElement("td");
      td.textContent = letras[(i + j) % 26];
      row.appendChild(td);
    }
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table;
}

document.getElementById("tabula").appendChild(gerarTabela());