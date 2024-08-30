// ---- Código geral ----
now = new Date();

//Define o id "ano", o ano e concatina 1997 com o ano anual, mostrado na secção copyright do rodapé em todas as páginas
let ano = now.getFullYear();
let anoId = document.getElementById("ano");
if (anoId) {
  anoId.innerHTML = "1997 - " + ano;
}


// ---- Treino ----
//Calculadora de Indice de Massa Corporal
if (document.getElementById("IMCp")) {
  if (localStorage.getItem('EstaLogado') == "true") {
    document.getElementById("IMCp").innerHTML += '<br> Veja o seu gráfico de IMC na <a href="/dados.html" id="linkQuiz"> página de Dados</a></p>';
  } else {
    document.getElementById("IMCp").innerHTML += "</p>";
  }
}
function IMC() {
  var altura, peso;
  document.getElementById("alturaIMC").defaultValue = localStorage.getItem('altura');
  document.getElementById("pesoIMC").defaultValue = localStorage.getItem('peso');
  altura = document.getElementById("alturaIMC").value;
  peso = document.getElementById("pesoIMC").value;

  //Calcula o IMC = Peso/Altura^2 e arredonda o IMC calculado anteriormente para 2 casas decimais
  var resultado = parseFloat(peso) / (parseFloat(altura)) ** 2;
  resultado = resultado.toFixed(2);
  //Se o resultado existir: mostra o resultado e o estado (baixo peso, saudável, etc)
  if (!isNaN(resultado)) {
    document.getElementById("resultadoIMC").innerHTML = resultado;
    if (resultado < 18.5) {
      document.getElementById("estadoIMC").innerHTML = "Baixo Peso";
    } else if (resultado < 25) {
      document.getElementById("estadoIMC").innerHTML = "Saudável";
    } else if (resultado < 30) {
      document.getElementById("estadoIMC").innerHTML = "Excesso de Peso";
    } else {
      document.getElementById("estadoIMC").innerHTML = "Obesidade";
    }
  }
}
if (document.getElementById("pesoIMC")) {
  document.addEventListener("DOMContentLoaded", IMC);
}
// ---- Info ----
// - Mudança de preço conforme a idade -
//Define "precoTabs" como uma array com a tabela do preço base e a tabela do preço premium
const precoTabs = [document.getElementById("precoBase"), document.getElementById("precoPrem")];

function selIdade(i) {
  //Definir os preços: Uma array de "três níveis": o primeiro qual o plano (base/premium) (f), o segundo a idade (jovem/adulto/sénior) (i) e o último com o preço (por mês/ por ano/ quanto por cada mês durante 1 ano) (k)
  let testPreco =
    [[["19,99", "199,99", "16,67"], ["24,99", "249,99", "20,83"], ["19,49", "199,49", "16.62"]],
    [["229,99", "2 299,49", "191,62"], ["249,99", "2 499,99", "208,33"], ["239,99", "2 399,49", "199,96"]]];
  let k, end, inicio;
  let f = 0;

  //1º ciclo (do): executa o 2º ciclo (for) para as duas tabelas (f): mostra os preços para cada coluna da tabela e se fôr a última coluna adiciona "(...€/mês)", se não fôr apenas adiciona "€" no final e mostra o preço tendo em conta os ciclos e a idade selecionada (i)
  do {
    for (k = 1; k < 4; k++) {
      if (k == 3) {
        end = "€/mês)";
        inicio = "(";
      }
      else {
        end = "€";
        inicio = "";
      }
      precoTabs[f].rows[1].cells[k].innerHTML = inicio + testPreco[f][i][k - 1] + end;
    }
    f++;
  } while (f < precoTabs.length);
}

//Define o preço "default" (preço mostrado antes do utilizador escolher)
if (document.getElementById("precoBase")) {
  let idade = localStorage.getItem('idade');
  if (idade) {
    if (idade <= 17) {
      selIdade(0);
      document.getElementById("selecionarIdade").options[1].selected = true;
    } else if (idade >= 65) {
      selIdade(2);
      document.getElementById("selecionarIdade").options[3].selected = true;
    } else {
      selIdade(1);
      document.getElementById("selecionarIdade").options[2].selected = true;
    }
  } else {
    selIdade(1);
  }
}

//Mostra o resultado ou anuncia o quiz na página Info
var infoPremium = document.getElementById("infoPremium");
if (infoPremium) {
  if (localStorage.getItem('plano') == "0") {
    infoPremium.innerHTML += ' De acordo com o seu <a id="linkQuiz" href="./mini-quiz.html">quiz</a>, acreditamos que o plano Base é o que melhor se adqua a si!';
  } else if (localStorage.getItem('plano') == "1") {
    infoPremium.innerHTML += ' De acordo com o seu <a id="linkQuiz" href="./mini-quiz.html">quiz</a>, acreditamos que o plano <span style="color:#ffd700;">Premium</span> é o que melhor se adqua a si!';
  } else {
    infoPremium.innerHTML += ' Descubra qual plano se adequa melhor a si <a id="linkQuiz" href="./mini-quiz.html">aqui</a>!';
  }
}


//Função cria uma borda dourada à volta do dia de semana atual
function semana() {
  var horario = document.getElementById("horario");
  var diaSem = now.getDay() + 1;

  //Se for feriado (dia de Natal ou Ano Novo) 
  if (horario && diaSem) {
    if ((now.getMonth() == 11 && now.getDate() == 25) || (now.getMonth() == 0 && now.getDate() == 1)) {
      horario.rows[0].cells[8].style.outline = "5px solid #ccad00";
    }
    else {
      horario.rows[0].cells[diaSem].style.outline = "5px solid #ccad00";
    }
  }
}
semana();

//Obter a idade desde a primeira ideia e a total da empresa mostrada na secção da "Localização"
function idades(ano) {
  document.getElementById("idade").innerHTML = ano - 1997;
  document.getElementById("idadeIdeia").innerHTML = ano - 1992;
}
if (document.getElementById("idade")) {
  idades(ano);
}

// Classificar a experiência

let est = document.querySelectorAll('.estrela');
//Mostra a avaliação de estrelas guardada no localstorage
function estrelaAntes() {
  if (est && localStorage.getItem('estrelas')) {
    let antes = localStorage.getItem('estrelas');
    while (1 <= antes) {
      //Verifica se a lista de classes contem a classe "estAtiva", se não, adiciona esta classe
      if (!document.querySelector('.est-' + antes).classList.contains('estAtiva')) {
        document.querySelector('.est-' + antes).classList.add('estAtiva');
      }
      --antes;
    }
  }
}
if (window.location.pathname == '/info.html') {
  estrelaAntes();
}

//Quando se clica numa estrela:
document.addEventListener('DOMContentLoaded', function() {
  let i = 0;
  while (i < est.length) {
    est[i].addEventListener('click', function() {
      let ea = parseInt(this.getAttribute("data-est"));
      //Faz um loop para ativar as estrelas anteriores à estrela clicada, define a estrela clicada (evitar conflictos com o código anterior) e verifica se a lista de classes contem a classe "estAtiva", se não, adiciona esta classe
      let antes = ea;
      while (1 <= antes) {
        if (!document.querySelector('.est-' + antes).classList.contains('estAtiva')) {
          document.querySelector('.est-' + antes).classList.add('estAtiva');
        }
        --antes;
      }

      //Quando se avalia com menos estrelas do que já avaliado, faz um loop para desativar as estrelas maiores, removendo a classe 'estAtiva'
      let depois = ea + 1;
      while (5 >= depois) {
        if (document.querySelector('.est-' + depois).classList.contains('estAtiva')) {
          document.querySelector('.est-' + depois).classList.remove('estAtiva');
        }
        ++depois;
      }
      localStorage.setItem('estrelas', ea);

      //Espera 1 milisegundo antes de aparecer a caixa de alerta para as estrelas mudarem de cor ao mesmo tempo que aparece a caixa de alerta
      setTimeout(() => {
        alert(
          `Obrigado pela sua classificação de ${ea} estrelas! 
  Deixe-nos saber o que podemos melhorar contactando-nos na secção abaixo.`);
      }, 1);
    })
    i++;
  }

})

//Se estiver com a sessão iniciada não precisa de voltar a por email e nome no formulário
function formLogado() {
  emailForm = document.getElementById("emailForm");
  nomeForm = document.getElementById("nomeForm");

  //Mostra o nome e email na caixa de input
  emailForm.placeholder = window.localStorage.getItem('email');
  emailForm.readOnly = true;
  nomeForm.placeholder = window.localStorage.getItem('nome') + " " + window.localStorage.getItem('apelido');
  nomeForm.readOnly = true;
}

//Se existir um email no localstorage, executa a função anterior
if (window.localStorage.getItem('email') != null && document.getElementById("emailForm")) {
  formLogado();
}

//Confirma se todos os espaços estão preenchidos e mensagem de confirmação de envio da mensagem: se existir o nome no localstorage, insere esse nome na caixa de alerta mostrada depois da confirmação e limpa o formulário depois de o enviar
function contactarForm() {
  if ((document.getElementById("nomeForm").readOnly || (document.getElementById("nomeForm").value && document.getElementById("emailForm").value)) && document.getElementById("assunto").value && document.getElementById("mensagem").value) {
    if (confirm("Tem a certeza que quer enviar a sua mensagem?")) {
      if (obterNome) {
        alert(`Obrigado, ${obterNome + " " + localStorage.getItem("apelido")}, por enviar a sua mensagem!`);
      } else {
        alert(`Obrigado, ${document.getElementById("nomeForm").value}, por enviar a sua mensagem!`);
      }
      document.getElementById("contactar").reset();
    }
  } else {
    alert("Por favor, preencha todos os espaços!");
  }
}

// Função que define o plano indicado tendo em conta as respostas do quiz
function determinarPreco() {
  if (resultadoQ == null) {
    document.getElementById("precoQuiz").innerHTML = "Responda a todas as perguntas para obter os resultados";
  }
  var questoes = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
  var questao = [];
  var resultadoQ = 0;

  //Define cada questão com um loop e para cada questão é atribuido um valor entre 0 e 3 conforme a importância da sua resposta para o plano premium

  for (var i = 0; i < questoes.length; i++) {
    var valorQuestao = document.querySelector(`input[name="${questoes[i]}"]:checked`).value;
    questao.push(valorQuestao);
    resultadoQ = resultadoQ + parseInt(questao[i]);
  }

  var premium = `Tendo em conta os seus resultados, o <p style="color:#ccad00">&nbsp;Premium&nbsp;</p> seria o adequado para si. `;
  var base = "Tendo em conta os seus resultados, o Base seria o adequado para si. ";

  //Se o resultado calculado anteriormente for > ou = a 4, então aconselha o plano premium, se não, o básico
  if (resultadoQ >= 4) {
    document.getElementById("precoQuiz").innerHTML = premium;
    localStorage.setItem('plano', '1');
  } else {
    document.getElementById("precoQuiz").innerHTML = base;
    localStorage.setItem('plano', '0');
  }

}

// ---- Info legal ----
//Obter a data completa atual mostrada na página infolegal.html
//Arrays com todos os dias da semana e do mês
let dia = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
let mes = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

//Mostra a data atual (Dia da semana, dia do mês, mês e ano) e define cada dia da semana/mês como a uma string dos arrays anteriores
data = document.getElementById("data");
if (data) {
  data.innerHTML = `Data atual: ${dia[now.getDay()]}, ${now.getDate()} de ${mes[now.getMonth()]} de ${ano}`;
}

// ---- Loja ----
//SlideShow na página de html
//-Mudar a cor do pack-
var ImagemInicial = document.getElementById("ImagemGrande");
var ImagensPequenas = document.getElementsByClassName("ImagemPequena");

if (ImagemInicial && ImagensPequenas) {
  for (let i = 0; i < ImagensPequenas.length; i++) {
    ImagensPequenas[i].onclick = function() {
      ImagemInicial.src = ImagensPequenas[i].src;
    }
  }
}


//Adicionar ao carrinho

/*
A variável "botao" é iniciada com o elemento HTML com o ID "botaocarrinho".
A variável "n" é iniciada com 0.
Verifica se a variável "botao" é verdadeira (se o elemento existe na página).
Se o elemento existir, é adicionado um evento de clique a ele que executa uma função.
*/

let botao = document.getElementById("botaocarrinho");
let n = 0;
if (botao) {
  botao.onclick = function(event) {
    //Dentro da função, são obtidos o nome do produto, a imagem, o preço e a quantidade desejada pelo usuário.
    let nome = document.getElementById('nomeProduto').innerHTML;
    let preçoproduto = document.getElementById('precoProduto').innerHTML;
    preçoproduto = parseFloat(preçoproduto.replace('€', ""));
    let quantidade = parseInt(document.getElementById('quantidade').value);

    /*
    Verifica-se também se existe um elemento com o ID "tamanho" na página e se ele tem um valor selecionado. Se não existir ou se estiver com o valor "Escolha o Tamanho", é exibida uma mensagem de alerta para o usuário.
    Se existir e estiver com um valor selecionado, é armazenado o tamanho selecionado.
    */

    let tamanhohtml = document.getElementById('tamanho');
    if (tamanhohtml == null) {
      tamanho = "Não se aplica";
    } else if (tamanhohtml.value == "Escolha o Tamanho") {
      alert("Escolha o tamanho para adicionar ao carrinho");
      return false;
    } else {
      tamanho = tamanhohtml.options[tamanhohtml.selectedIndex].text;
    }
    /*
    É calculado o preço total (preço por quantidade) e os dados são armazenados em um objeto "produtos".
    É verificado se já existe algum produto na lista de produtos armazenada no localStorage. Se sim, o objeto "produtos" é adicionado à lista existente. Caso contrário, é criada uma nova lista com este objeto.
    */

    let ImagemGrande = document.getElementById('ImagemGrande').getAttribute("src");

    preçoQTD = parseFloat(preçoproduto) * quantidade;

    let produtos = {
      nome: nome,
      src: ImagemGrande,
      tamanho: tamanho,
      quantidade: quantidade,
      preço: preçoproduto,
      preçoQTD: preçoQTD,
      NoCarrinho: true
    };
    let produtosLista = [];

    const lista = localStorage.getItem('ProdutosLista');
    if (lista) {
      produtosLista = JSON.parse(localStorage.getItem('ProdutosLista'));
      produtosLista.push(produtos);
      localStorage.setItem('ProdutosLista', JSON.stringify(produtosLista));
    } else {
      produtosLista.push(produtos);
      localStorage.setItem('ProdutosLista', JSON.stringify(produtosLista));
    }

    //A função "calcTotal" é chamada para calcular o total do carrinho de compras.

    calcTotal();
  }
}




function Carrinho() {

  /*
  A variável "listaProdutos" é iniciada com os produtos armazenados no localStorage.
  A variável "tabelaConteudo" é iniciada com o elemento HTML com a classe "TabelaCarrinho".
  */

  let listaProdutos = localStorage.getItem('ProdutosLista');
  listaProdutos = JSON.parse(listaProdutos);
  let tabelaConteudo = document.querySelector('.TabelaCarrinho');

  /*
  Verifica se existem ambos os elementos (tabelaConteudo e listaProdutos).
  Se existirem, é criado um loop para percorrer todos os produtos da lista.
  Dentro do loop, é adicionado o conteúdo HTML correspondente a cada produto, incluindo sua imagem, nome, preço, botão para remover, tamanho e preço total.
  É adicionado também os valores do subtotal, taxa e total para exibir ao final do carrinho.
  */

  if (tabelaConteudo && listaProdutos) {
    for (let p = 0; p < listaProdutos.length; p++) {
      let preçoP = listaProdutos[p].preçoQTD;
      preçoP = Math.round(preçoP * 100) / 100;
      tabelaConteudo.innerHTML += `
      <tr>
        <td>
          <div class="infocarrinho">
            <img src="${listaProdutos[p].src}">
            <div>
              <h4 id="NomeCarrinhoProduto">${listaProdutos[p].nome}</h4>
              <p>Preço: <span id="PreçoCarrinhoProduto">${listaProdutos[p].preço}</span>€</p>
              <a href="#" id="${p}" class="botãoRemover" onClick="removerProd(${p})">Remover</a>
            </div>
           </div>
        </td>
        <td><input id="QuantidadeCarrinhoProduto.${p}" type="number" value="${listaProdutos[p].quantidade}" oninput="calcTotal()"></td>
        <td  id="TamanhoCarrinhoProduto">${listaProdutos[p].tamanho}</td>
        <td id="PreçoCarrinhoSubtotal">${preçoP}€</td>
      </tr>`;
      let Subtotal = document.getElementById('Subtotal');
      let Taxa = document.getElementById('Taxa');
      let Total = document.getElementById('Total');
      Subtotal.innerHTML = Math.round(localStorage.getItem('preçoTotal') * 100) / 100;
      Taxa.innerHTML = 4.01;
      Total.innerHTML = Math.round(localStorage.getItem('preçoTotalTotal') * 100) / 100;
    }
  }
}

//A função é chamada logo apos a sua declaração.
Carrinho();

function calcTotal() {
  /* 
  A variável "listaProdutos" é iniciada com os produtos armazenados no localStorage.
  São iniciadas as variáveis "precoTotal" e "quantidadeTotal" com 0.
  */
  let listaProdutos = localStorage.getItem('ProdutosLista');
  listaProdutos = JSON.parse(listaProdutos);
  let precoTotal = 0;
  let quantidadeTotal = 0;

  /* 
  É criado um loop para percorrer todos os produtos da lista.
  Dentro do loop, é obtido o elemento HTML do input da quantidade do produto e atualizado o valor na lista de produtos.
  */

  for (let p = 0; p < listaProdutos.length; p++) {
    let input = document.getElementById(`QuantidadeCarrinhoProduto.${p}`);
    if (input) {
      listaProdutos[p].quantidade = parseInt(input.value);
      listaProdutos[p].preçoQTD = listaProdutos[p].quantidade * listaProdutos[p].preço;
    }
    /*
    É calculado o preço total e a quantidade total dos produtos.
    Os valores são armazenados no localStorage.
    */
    precoTotal += listaProdutos[p].preço * listaProdutos[p].quantidade;
    quantidadeTotal += listaProdutos[p].quantidade;
  }
  localStorage.setItem('preçoTotal', precoTotal);
  localStorage.setItem('preçoTotalTotal', precoTotal + 4.01);
  localStorage.setItem('QTD Produtos', quantidadeTotal);
  localStorage.setItem('ProdutosLista', JSON.stringify(listaProdutos));
  /*A página é recarregada.*/
  location.reload();
}

function removerProd(p) {

  /*
  A variável "listaProdutos" é iniciada com os produtos armazenados no localStorage.
  O produto correspondente ao índice passado como parâmetro é removido da lista de produtos.
  A lista atualizada é armazenada no localStorage.
  */

  let listaProdutos = localStorage.getItem('ProdutosLista');
  listaProdutos = JSON.parse(listaProdutos);
  listaProdutos.splice(p, 1);
  listaProdutos = localStorage.setItem('ProdutosLista', JSON.stringify(listaProdutos));

  //A função "calcTotal" é chamada para atualizar os valores totais.

  calcTotal();

  //A página é recarregada.

  location.reload();
}

function limpar() {
  if (localStorage.getItem('preçoTotal') == 0 || localStorage.getItem('ProdutosLista') == null) {
    alert("Tem que escolher produtos para comprar!");
  } else {
    localStorage.removeItem('QTD Produtos');
    localStorage.removeItem('ProdutosLista');
    localStorage.removeItem('preçoTotalTotal');
    localStorage.removeItem('preçoTotal');
    location.reload();
    alert("Compra efetuada com sucesso!");
  }
}


let quantId = document.getElementById("quantidadeP");
if (quantId) {
  quantId.innerHTML = localStorage.getItem("QTD Produtos");
}

// ---- Iniciar Sessão ----
var formI = document.getElementById("iniciarsessao");
//Obter os inputs do formulário de iniciar sessão 
let email_i = document.getElementById("email_i");
let pass_i = document.getElementById("pass_i");

//Obter dados da localStorage
let obterEmail = localStorage.getItem("email");
let obterPwd = localStorage.getItem("pwd");

if (formI) {
  formI.addEventListener('submit', verificarLogin);
}


function verificarLogin(_event) {
  localStorage.setItem('EstaLogado', false);
  if (email_i.value == obterEmail && pass_i.value == obterPwd) {
    document.getElementById("form_msg_erro_geral").style.color = "green";
    document.getElementById("form_msg_erro_geral").innerHTML = "Sucesso!";
    _event.preventDefault();
    if (localStorage.getItem("cor") === null) {
      var cor = CorAleatorio();
      localStorage.setItem('cor', cor);
    }

    localStorage.setItem('EstaLogado', true);
    window.location = "index.html";
  }
  else {
    document.getElementById("form_msg_erro_geral").innerHTML = "Email ou Password Incorretos!";
    _event.preventDefault();
  }
}

// ---- Dropdown Conta ----   

let dMenu = document.getElementById("menuDropdown");

function AbrirMenu() {
  //A variável "dMenu" é iniciada com o elemento HTML com o ID "menuDropdown
  //Adiciona ou remove a classe "abrir" no elemento, o que alterna entre mostrar ou esconder o menu.
  let dMenu = document.getElementById("menuDropdown");
  dMenu.classList.toggle("abrir");
}
function AbrirLogIn() {
  //Redireciona o usuário para a página "iniciosessao.html"
  window.location = "iniciosessao.html";

}
function CheckInicioSessao() {
  /*
  Obtém o e-mail do usuário armazenado no localStorage.
  Verifica se o usuário está logado, se não estiver, redireciona para a página de login.
  Se estiver logado, abre o menu.
  */

  if (localStorage.getItem("EstaLogado") == "false") {
    AbrirLogIn();
  }
  else {
    AbrirMenu();
  }
}

function CruzMain() {
  //Redireciona o usuário para a página "index.html"
  window.location = "index.html";
}

/*
A variável "User_Nome" é iniciada com o elemento HTML com o ID "User_Nome".
Obtém o nome e o apelido do usuário armazenados no localStorage.
Se existir os valores de nome e apelido e o elemento User_Nome, o nome e o apelido são adicionados ao elemento.
*/

let User_Nome = document.getElementById("User_Nome");
let obterNome = localStorage.getItem("nome");
let obterApelido = localStorage.getItem("apelido");

if (obterNome && obterApelido && User_Nome) {
  User_Nome.innerHTML = obterNome + " " + obterApelido;
}



// ---- Registo ----
if (localStorage.getItem('EstaLogado') !== "true") {
  localStorage.setItem('EstaLogado', "false");
}
//Obter os inputs do formulário de registo
var form = document.getElementById("registo");
var nome = document.getElementById("nome_r");
var apelido = document.getElementById("apelido_r");
var email = document.getElementById("email_r");
var pwd = document.getElementById("password_r");
var cpwd = document.getElementById("cpassword_r");
var nsocio = document.getElementById("nsocio_r");
var letrasnm = /^[A-Za-z]/;

//Função que verifica se o nome tem números
function verificarNome() {

  if (nome) {
    if (nome.value.length == 0) {
      document.getElementById("form_msg_erro_nome").innerHTML = "*Preencha com o primeiro nome!";
      return false;
    }
    if (!nome.value.match(letrasnm)) {
      document.getElementById("form_msg_erro_nome").innerHTML = "*O nome não poderá ter algarismos!";
      return false;
    }
    else {
      document.getElementById("form_msg_erro_nome").innerHTML = "";
      return true;
    }
  }
}


//Função que verifica se o apelido tem números
function verificarApelido() {
  if (apelido) {
    if (apelido.value.length == 0) {
      document.getElementById("form_msg_erro_apelido").innerHTML = "*Preencha com o seu apelido!";
      return false;
    }
    if (!apelido.value.match(letrasnm)) {
      document.getElementById("form_msg_erro_apelido").innerHTML = "*O apelido só poderá ter caracteres!";
      return false;
    }
    else {
      document.getElementById("form_msg_erro_apelido").innerHTML = "";
      return true;
    }
  }
}
//Função que verifica se o email é válido em sintaxe
function verificarEmail() {
  var simbolos_letras = /^[a-zA-z\._\-[0-9]*[@][A-Za-z]*[\.[a-z]{2,4}.$/;
  if (email) {
    if (email.value.length == 0) {
      document.getElementById("form_msg_erro_email").innerHTML = "*Preencha com o seu e-mail!";
      return false;
    }
    if (!email.value.match(simbolos_letras)) {
      document.getElementById("form_msg_erro_email").innerHTML = "*E-mail inválido!";
      return false;
    }
    else {
      document.getElementById("form_msg_erro_email").innerHTML = "";
      return true;
    }
  }
}

//Visibilidade da Password
const visibilidade = document.getElementById("visibilidade");
const icon = document.getElementById("passIcon");
if (visibilidade) {
  visibilidade.addEventListener("click", AcionarVisibilidade);
}


function AcionarVisibilidade() {
  const pwdInput = document.getElementById("password_r");
  if (pwdInput) {
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      icon.innerText = "visibility_off";
    }
    else {
      pwdInput.type = "password";
      icon.innerText = "visibility";
    }
  }


  const pwdInputEdit = document.getElementById("passNP");
  if (pwdInputEdit) {
    if (pwdInputEdit.type === "password") {
      pwdInputEdit.type = "text";
      icon.innerText = "visibility_off";
    }
    else {
      pwdInputEdit.type = "password";
      icon.innerText = "visibility";
    }
  }
}


//Função que verifica se a password é válida 
function verificarPass() {
  if (pwd) {
    if (pwd.value.length == 0) {
      document.getElementById("form_msg_erro_pass").innerHTML = "*Preencha com a sua password!";
      return false;
    }
    if (pwd.value.length < 7) {
      document.getElementById("form_msg_erro_pass").innerHTML = "*A password terá que ter mais que 6 caracteres!";
      return false;
    }
    else {
      document.getElementById("form_msg_erro_pass").innerHTML = "";
      return true;
    }
  }
}

//Função que verifica se a password corresponde à confirmação
function verificarCPass() {
  if (cpwd) {
    if (cpwd.value.length == 0) {
      document.getElementById("form_msg_erro_cpass").innerHTML = "*Preencha com a sua confirmação de password!";
      return false;
    }
    if (pwd.value != cpwd.value) {
      document.getElementById("form_msg_erro_cpass").innerHTML = "*A password não coincide com a inserida!";
      return false;
    }
    else {
      document.getElementById("form_msg_erro_cpass").innerHTML = "";
      return true;
    }
  }
}
//Função que verifica se todos os inputs estão corretos e armazena-os na localStorage
function verificarForm(event) {
  if (!verificarNome() || !verificarApelido() || !verificarEmail() || !verificarPass() || !verificarCPass()) {
    document.getElementById("form_msg_erro_geral").innerHTML = "Erro na submissão!";
    event.preventDefault();
    return false;

  }
  else {

    //Armazenar os inputs nas variáveis para posteriormente colocar no armazenamento local
    let nome = document.getElementById("nome_r").value;
    var apelido = document.getElementById("apelido_r").value;
    var email = document.getElementById("email_r").value;
    var pwd = document.getElementById("password_r").value;
    var nsocio = document.getElementById("nsocio_r").value;

    //LocalStorage
    localStorage.setItem("nome", nome);
    localStorage.setItem("apelido", apelido);
    localStorage.setItem("email", email);
    localStorage.setItem("pwd", pwd);
    localStorage.setItem("nsocio", nsocio);
    document.getElementById("form_msg_erro_geral").style.color = "green";
    document.getElementById("form_msg_erro_geral").innerHTML = "Sucesso!";
    event.preventDefault();
    window.location = "iniciosessao.html";
    return true;
  }
}
if (form) {
  form.addEventListener('submit', verificarForm);

}
//-------------------------Avatar----------------------------------
function CorAleatorio() {
  var letras = "0123456789ABCDEF";
  var cor = "#";
  for (var i = 0; i < 6; i++) {
    cor += letras[Math.floor(Math.random() * 16)];
  }
  return cor;
}

if (localStorage.getItem('EstaLogado') == "true") {
  let nomeavatar = (localStorage.getItem('nome').charAt(0).toUpperCase());

  let apelidoavatar = (localStorage.getItem('apelido').charAt(0).toUpperCase());

  let cor = localStorage.getItem('cor');
  function generateAvatar(
    text,
    foregroundColor = "white",
    backgroundColor = "black"
  ) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 200;


    //  background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    //  texto
    context.font = "bold 100px Oswald";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
  }

  avatar = document.getElementById("avatar");

  if (avatar) {
    let avatarGer = generateAvatar(
      `${nomeavatar}${apelidoavatar}`,
      "white",
      `${cor}`
    );
    avatar.src = avatarGer;

    document.getElementById("imgUser").src = avatarGer;
  }
}


if (document.getElementById("nomeD")) {
  document.getElementById("nomeD").placeholder = localStorage.getItem('nome');
  document.getElementById("apelidoD").placeholder = localStorage.getItem('apelido');
}


const inputs = ['idade', 'peso', 'altura', 'telemovel', 'nome', 'apelido'];
function placeholders() {
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    var inputId = document.getElementById(input + "D");
    if (localStorage.getItem(input)) {
      inputId.placeholder = localStorage.getItem(input);
    } else {
      if (i == 0 || i == 2) {
        inputId.placeholder = "Insira aqui a sua " + input;
      } else {
        inputId.placeholder = "Insira aqui o seu " + input;
      }
    }
  }
}
if (document.getElementById("pesoD")) {
  placeholders();
}

var validarDdsPess = document.getElementById("validarDdsPess");


if (validarDdsPess) {
  validarDdsPess.addEventListener("click", defDados);
}

function defDados() {
  if (document.getElementById("telemovelD").value.length == 0 || document.getElementById("telemovelD").value.length == 9) {
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var inputId = document.getElementById(input + "D");
      if (inputId.value !== "") {
        localStorage.setItem(input, inputId.value);
      }
    }
    alert("Informações atualizadas com sucesso!");
  } else {
    alert("Por favor insira um número telemóvel válido!");
  }
}


function ColocarDados() {
  emailStorage = localStorage.getItem('email');
  pwdStorage = localStorage.getItem('pwd');
  nsocio = localStorage.getItem('nsocio');
  emailForm = document.getElementById("emailP");
  PassForm = document.getElementById("passP");
  SocioForm = document.getElementById("nSocio");
  if (emailForm && PassForm && SocioForm) {
    emailForm.value = emailStorage;
    PassForm.value = pwdStorage;
    SocioForm.value = nsocio;
  }
}
ColocarDados();

validarDdsAcs = document.getElementById('validarDdsAcs');
if (validarDdsAcs) {
  validarDdsAcs.addEventListener("click", EditarPass);
}

function EditarPass() {
  passNP = document.getElementById("passNP").value;
  passNCP = document.getElementById("passNCP").value;
  if (passNP.length == 0) {
    alert("Para validar é necessário fazer alguma alteração na password");
  } else if (passNP.length < 7 && passNP.length != 0) {
    alert("A password tem de ter mais que 6 caracteres");
  } else if (passNP != passNCP) {
    alert("A nova password não coincide com a confirmação");
  } else {
    localStorage.setItem("pwd", passNP);
    location.reload();
    alert("Password Alterada")
  }
}

var validarLugar = document.getElementById('validarLugar');
if (window.location.pathname == 'editarPerfil.html' && localStorage.getItem("ginásio")) {
  document.getElementById("localD").options[localStorage.getItem("ginásio")].selected = true;
}


function lugar() {
  var items = document.getElementById("localD").options;
  localStorage.setItem("ginásio", items.selectedIndex);
  alert("Informações atualizadas com sucesso!");
}

function LogOut() {
  if (confirm("Tem a certeza que deseja sair da sua conta?")) {
    localStorage.setItem('EstaLogado', "false");
    location.reload();
  }
}


//Escolher a cor de fundo do perfil
var CorArm = document.getElementById("CorSalva");
var corStor = localStorage.getItem('cor');
if (CorArm) {
  CorArm.style.backgroundColor = corStor;
}




function pCor() {
  let CorInput = document.getElementById("CorInput");
  var CorCod = document.getElementById("corCod");
  CorCod.innerHTML = CorInput.value;
  setTimeout(() => {
    alert("Não se esqueça de cliclar em 'Validar' para salvar a cor definida!");
  }, 2500);
}

function SalvarCor() {
  let CorInput = document.getElementById("CorInput").value;
  localStorage.setItem('cor', CorInput);
  location.reload();
}




//Sobre a loja esconder e mostrar divs

function sobre(i) {
  var acc = document.querySelectorAll(".SobreLojaInfoFlex");
  acc[i].classList.toggle("active");
  for (var j = 0; j < acc.length; j++) {
    if (i != j) {
      acc[j].classList.remove("active");
    }
  }

  for (var k = 0; k < 4; k++) {
    var panel = document.getElementById("sobre" + k);
    if (acc[k].classList.contains("active")) {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }
  }
}

document.querySelectorAll(".InfoIconSobre").forEach(function(element) {
  element.style.display = "none";
});

//Verifica se a página atual é "dados.html".
if (window.location.pathname == '/dados.html') {

  /*
  O primeiro gráfico é uma linha mostrando a frequência cardíaca máxima em relação à idade. Ele carrega o pacote "corechart" do Google Charts e define uma função de callback para desenhar o gráfico.
  */

  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    /*
    Dentro da função drawChart, os valores são iniciados como 0 para todas as idades e frequências cardíacas. Então, é criado um loop para percorrer todas as linhas do gráfico e calcular os valores corretos de frequência cardíaca máxima (FCM), zona de exercício aeróbico máximo (ZAM) e zona de exercício aeróbico mínimo (ZAm) usando a fórmula de FCM = 208 - (0,7 * idade); ZAM = FCM * 0,8; ZAm = FCM * 0,6.
    */

    var dados = google.visualization.arrayToDataTable([['Idade', 'FCM', 'ZAM', 'ZAm'],

    [0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [3, 0, 0, 0], [4, 0, 0, 0], [5, 0, 0, 0], [6, 0, 0, 0], [7, 0, 0, 0], [8, 0, 0, 0], [9, 0, 0, 0], [10, 0, 0, 0], [11, 0, 0, 0], [12, 0, 0, 0], [13, 0, 0, 0], [14, 0, 0, 0], [15, 0, 0, 0], [16, 0, 0, 0], [17, 0, 0, 0], [18, 0, 0, 0], [19, 0, 0, 0], [20, 0, 0, 0], [21, 0, 0, 0], [22, 0, 0, 0], [23, 0, 0, 0], [24, 0, 0, 0], [25, 0, 0, 0], [26, 0, 0, 0], [27, 0, 0, 0], [28, 0, 0, 0], [29, 0, 0, 0], [30, 0, 0, 0], [31, 0, 0, 0], [32, 0, 0, 0], [33, 0, 0, 0], [34, 0, 0, 0], [35, 0, 0, 0], [36, 0, 0, 0], [37, 0, 0, 0], [38, 0, 0, 0], [39, 0, 0, 0], [40, 0, 0, 0], [41, 0, 0, 0], [42, 0, 0, 0], [43, 0, 0, 0], [44, 0, 0, 0], [45, 0, 0, 0], [46, 0, 0, 0], [47, 0, 0, 0], [48, 0, 0, 0], [49, 0, 0, 0], [50, 0, 0, 0], [51, 0, 0, 0], [52, 0, 0, 0], [53, 0, 0, 0], [54, 0, 0, 0], [55, 0, 0, 0], [56, 0, 0, 0], [57, 0, 0, 0], [58, 0, 0, 0], [59, 0, 0, 0], [60, 0, 0, 0], [61, 0, 0, 0], [62, 0, 0, 0], [63, 0, 0, 0], [64, 0, 0, 0], [65, 0, 0, 0], [66, 0, 0, 0], [67, 0, 0, 0], [68, 0, 0, 0], [69, 0, 0, 0], [70, 0, 0, 0], [71, 0, 0, 0], [72, 0, 0, 0], [73, 0, 0, 0], [74, 0, 0, 0], [75, 0, 0, 0], [76, 0, 0, 0], [77, 0, 0, 0], [78, 0, 0, 0], [79, 0, 0, 0], [80, 0, 0, 0]
    ]);
    
    for (var i = 0; i < dados.getNumberOfRows(); i++) {
      var idadeG = dados.getValue(i, 0);
      var fcm = 208 - (0.7 * idadeG);
      dados.setValue(i, 1, fcm);
      var zam = fcm * 0.8;
      dados.setValue(i, 2, zam);
      var zAm = fcm * 0.6;
      dados.setValue(i, 3, zAm);
    }

    /*Em seguida, as opções de gráfico são definidas, incluindo o título, o tipo de curva e a posição da legenda.
    O gráfico é desenhado usando as informações de dados e opções.*/

    var options = {
      title: 'Frequência Cardíaca Máxima',
      curveType: 'function',
      legend: { position: 'bottom' },
      series: {
        0: { color: 'red' },
        1: { color: 'green' },
        2: { color: 'lightgreen' }
      }
    };

    /*O segundo gráfico é uma área mostrando o índice de massa corporal (IMC) em relação aos valores de baixo peso, normal, excesso de peso e obesidade. Ele carrega novamente o pacote "corechart" do Google Charts e define uma função de callback para desenhar o gráfico.*/

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(dados, options);
  }


  let alturaIMC = parseFloat(localStorage.getItem('altura'));
  let pesoIMC = parseFloat(localStorage.getItem('peso'));
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawChartIMC);
  /*
  Dentro da função drawChartIMC, os valores são iniciados com as informações de baixo peso, normal, excesso de peso e obesidade. Então, é calculado o IMC do usuário usando a fórmula IMC = peso / (altura^2).
  */
  function drawChartIMC() {
    var data = google.visualization.arrayToDataTable([
      ['Índice de Mass Corporal', 'Valores'],
      ['Baixo Peso', 18.5],
      ['Normal', 25],
      ['Excesso de Peso', 30],
      ['Obesidade', 35]
    ]);
    /*
    As opções de gráfico são definidas, incluindo o título, eixos e legenda.
    O gráfico é desenhado usando as informações de dados e opções.
    */
    var options = {
      title: 'Índice de Massa Corporal',
      hAxis: { title: 'IMC', minValue: 0, maxValue: 40 },
      vAxis: { title: 'Valores' },
      legend: 'none',
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));

    let IMC = pesoIMC / (alturaIMC * alturaIMC);
    if (IMC < 18.5) {
      options.colors = ['blue'];
    } else if (IMC < 25) {
      options.colors = ['green'];
    } else if (IMC < 30) {
      options.colors = ['yellow'];
    }
    else if (IMC <= 100) {
      options.colors = ['red'];
    }
    else {
      options.colors = ['black'];
    }

    chart.draw(data, options);

    /*
    O gráfico é desenhado usando as informações de dados e opções. É adicionado também uma função de evento para mudar a cor do gráfico baseado no IMC do usuário. Se o IMC for menor do que 18,5, a cor será azul. Se o IMC estiver entre 18,5 e 25, a cor será verde. Se o IMC estiver entre 25 e 30, a cor será amarela. Se o IMC for maior do que 30, a cor será vermelha.
    */

    google.visualization.events.addListener(chart, 'select', function() {
      var selectedItem = chart.getSelection()[0];
      var value = data.getValue(selectedItem.row, 0);
      if (IMC < 18.5) {
        options.colors = ['blue'];
      } else if (IMC < 25) {
        options.colors = ['green'];
      } else if (IMC < 30) {
        options.colors = ['yellow'];
      }
      else if (IMC <= 100) {
        options.colors = ['red'];
      }
      else {
        options.colors = ['black'];
      }
    })
    chart.draw(data, options);

  }

  /*
  Esta função é usada para calcular o IMC (índice de massa corporal) do usuário e fornecer conselhos de acordo com o resultado. Ele usa as variáveis alturaIMC e pesoIMC, que são obtidas do armazenamento local, para calcular o IMC. Em seguida, ele usa a div "ConselhosIMC" para exibir o resultado do cálculo do IMC e diferentes conselhos de acordo com o intervalo de valor do IMC. Ele também muda a cor de fundo da div "ConselhosIMC" de acordo com o intervalo de valor do IMC.
  */

  function IMCConselho() {
    if (alturaIMC && pesoIMC) {
      let IMC = Math.round(pesoIMC / (alturaIMC * alturaIMC) * 100) / 100;
      divConselho = document.getElementById('ConselhosIMC');
      if (divConselho) {
        divConselho.style.display = "block";
        if (IMC < 18.5) {
          divConselho.innerHTML = `<p class="IMCValor">O seu é IMC: ${IMC}</p><br>
          <p> É importante concentrar-se em ganhar peso de forma saudável. Isso pode ser alcançado aumentando o consumo calórico com alimentos ricos em nutrientes e exercício regular. Deve consultar um médico ou nutricionista da Maximal para obter conselhos personalizados.</p>`;
          divConselho.style.backgroundColor = "#98F5FF";
        } else if (IMC < 25) {
          divConselho.innerHTML = `<p class="IMCValor">O seu é IMC: ${IMC}</p><br>
          <p>É importante manter uma dieta equilibrada e saudável e praticar regularmente exercício físico para manter o peso.</p>`;
          divConselho.style.backgroundColor = "#90EE90";
        } else if (IMC < 30) {
          divConselho.innerHTML = `<p class="IMCValor">O seu é IMC: ${IMC}</p><br>
          <p>É importante perder peso de forma saudável e gradual. Isso pode ser alcançado através da mudança do estilo de vida, como aumentando a atividade física e ajustando a dieta para incluir menos calorias e mais nutrientes.</p>`;
          divConselho.style.backgroundColor = "#FFF8DC";
        } else if (IMC <= 100) {
          divConselho.innerHTML = `<p class="IMCValor">O seu é IMC: ${IMC}</p><br>
        <p>É importante tomar medidas imediatas para perder peso de forma saudável e gradual. Isso pode ser alcançado através da mudança do estilo de vida, como aumentando a atividade física, ajustando a dieta para incluir menos calorias e mais nutrientes e, eventualmente, considerando opções de tratamento médico como cirurgia bariátrica. É importante consultar um médico ou nutricionista para obter conselhos personalizados e um plano de tratamento adequado.</p>`;
          divConselho.style.backgroundColor = "#F88379";
        }
        else {
          `<p class="IMCValor">O seu é IMC: ${IMC}</p><<br>
        <p>Volte à página de editar perfil para recolocar os seus dados de peso e altura</p>`;
        }
      }
    }
  }
  IMCConselho();
}

//Botão para ir para o topo da página de maneira suave
function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}



//Trabalho realizado por Diogo Rego (nº6) e Diogo Carreira (nº7)