const chaveEl = document.getElementById('chave')
const alfabetoEl = document.getElementById('alfabeto')
const alfabetoCifradoEl = document.getElementById('alfabeto-cifrado')
const modoEl = document.getElementById('modo')
const mensagemEl = document.getElementById('mensagem')
const textoCifradoEl = document.getElementById('texto-cifrado')

function preencherConjuntoLetras(elementoEl, primeiraLetra) {
  elementoEl.innerHTML = ''

  let c = primeiraLetra.charCodeAt(0)

  for (let i = 0; i < 26; i++) {
    let cell = document.createElement('input')
    cell.type = 'text'
    cell.disabled = true
    cell.classList.add('cell')
    cell.value = String.fromCharCode((c + i - 65) % 26 + 65)
    elementoEl.appendChild(cell)
  }
}

function aplicarCifraCesar(chave, texto) {
  if (chave == 0 || isNaN(chave)) return texto
  chave = chave % 26
  let textoCifrado = ""
  for (i = 0; i < texto.length; i++) {
    let c = texto[i]
    if (c >= 'a' && c <= 'z') 
      c = String.fromCharCode((c.charCodeAt(0) - 97 + chave) % 26 + 97)
    else if (c >= 'A' && c <= 'Z')
      c = String.fromCharCode((c.charCodeAt(0) - 65 + chave) % 26 + 65)
    textoCifrado += c
  }
  return textoCifrado
}

function encrypt(chave, textoOriginal) {
  return aplicarCifraCesar(chave, textoOriginal)
}

function decryptC(chave, textoCifrado) {
  chave = chave * -1
  return aplicarCifraCesar()
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

function atualizarConteudoInterativo() {
  if (chaveEl.value != '') chaveEl.nextElementSibling.classList.add('show')
  if (chaveEl.value === '') chaveEl.nextElementSibling.classList.remove('show')

  let chave = chaveEl.value

  let c = encrypt(chave, 'A') // c é a primeira letra do alfabeto cifrado

  preencherConjuntoLetras(alfabetoCifradoEl, c)

  if (modoEl.checked)
      mensagemEl.value = decryptC(chave, textoCifradoEl.value)
  else 
      textoCifradoEl.value = encrypt(chave, mensagemEl.value)
}

modoEl.addEventListener('change', () => {
  trocarModo()
})


mensagemEl.addEventListener('input', () => {
    atualizarConteudoInterativo()
});

textoCifradoEl.addEventListener('input', () => {
    atualizarConteudoInterativo()
});

chaveEl.addEventListener('input', () => {
    atualizarConteudoInterativo()
});

preencherConjuntoLetras(alfabetoEl, "A")