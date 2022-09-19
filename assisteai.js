let filmes = [];

onload = () => {
  const t = JSON.parse(localStorage.getItem("filmes"));
  if (t) filmes = t;
  mostraFilmes("listaDeFilmesAssistir", "blankAssistir");
  document.querySelector("#inputNovoFilme").oninput = monitoraCampoAdic;
  document.querySelector("#inputAlteraNomeFilme").oninput = monitoraCampoAlt;
  document.querySelector("#inputNovoFilme").onkeypress = (e) => {
    if (e.key == "Enter") adicionaTarefa();
  };
  document.querySelector("#inputAlteraNomeFilme").onkeypress = (e) => {
    if (e.key == "Enter") alteraFilme();
  };

  document.querySelector("#btnAdic").onclick = () => {
    document.querySelector("#btnInc").disabled = true;
    ativa("tela2");
    document.querySelector("#inputNovoFilme").focus();
  };

  document.querySelector("#btnCanc1").onclick = () => {
    document.querySelector("#inputNovoFilme").value = "";
    ativa("tela1");
  };

  document.querySelector("#btnCanc2").onclick = () => {
    let campo = document.querySelector("#inputAlteraNomeFilme");
    campo.value = "";
    campo.removeAttribute("data-id");
    ativa("tela1");
  };

  document.querySelector("#btnInc").onclick = () => {
    adicionaFilme();
  };

  document.querySelector("#btnAlt").onclick = () => {
    alteraFilme();
  };

  document.querySelector("#btnDel").onclick = () => {
    apagaFilme();
  };

  document.querySelector("#btnAssistidos").onclick = () => {
    ativa("tela4");
    mostraFilmes("listaDeFilmesAssistidos", "blankAssistidos");
  };

  document.querySelector("#btnAssistir").onclick = () => {
    ativa("tela1");
    mostraFilmes("listaDeFilmesAssistir", "blankAssistir");
  };
};

const mostraFilmes = (idLista, idBlank) => {
  const listaDeFilmes = document.querySelector(`#${idLista}`);
  listaDeFilmes.innerHTML = "";

  let filmesFilter = filmes.filter(
    (filme) => filme.visto === (idLista === "listaDeFilmesAssistidos")
  );

  filmesFilter.forEach((t) => {
    let elemFilme = document.createElement("li");
    let nomeFilme = document.createElement("p");
    nomeFilme.innerHTML = t.nome;

    elemFilme.appendChild(nomeFilme);

    elemFilme.setAttribute("data-id", t.id);
    elemFilme.onclick = () => {
      let campo = document.querySelector("#inputAlteraNomeFilme");
      let check = document.querySelector("#checkAlteraVistoNovoFilme");
      ativa("tela3");
      campo.value = t.nome;
      check.checked = t.visto;
      campo.setAttribute("data-id", t.id);
      campo.focus();
    };

    listaDeFilmes.appendChild(elemFilme);
  });
  document.querySelector("#estado").innerText = filmesFilter.length;
  if (filmesFilter.length > 0) {
    listaDeFilmes.classList.remove("hidden");
    document.querySelector(`#${idBlank}`).classList.add("hidden");
  } else {
    listaDeFilmes.classList.add("hidden");
    document.querySelector(`#${idBlank}`).classList.remove("hidden");
  }
};

const ativa = (comp) => {
  let listaDeTelas = document.querySelectorAll("body > .component");
  listaDeTelas.forEach((c) => c.classList.add("hidden"));
  document.querySelector("#" + comp).classList.remove("hidden");
};

const adicionaFilme = () => {
  let campo = document.querySelector("#inputNovoFilme");
  let nome = campo.value;
  let check = document.querySelector("#checkVistoNovoFilme");
  let visto = check.checked;
  if (nome != "") {
    filmes.push({
      id: Math.random().toString().replace("0.", ""),
      nome: nome,
      visto: visto,
    });

    campo.value = "";
    check.checked = false;
    ativa("tela1");
    salvaFilmes();
    mostraFilmes("listaDeFilmesAssistir");
  }
};

const monitoraCampoAdic = (e) => {
  let botao = document.querySelector("#btnInc");
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const alteraFilme = () => {
  let campo = document.querySelector("#inputAlteraNomeFilme");
  let check = document.querySelector("#checkAlteraVistoNovoFilme");

  let idTarefa = campo.getAttribute("data-id");
  let i = filmes.findIndex((t) => t.id == idTarefa);
  filmes[i].nome = campo.value;
  filmes[i].visto = check.checked;
  campo.value = "";
  check.checked = false;
  campo.removeAttribute("data-id");
  ativa("tela1");
  salvaFilmes();
  mostraFilmes("listaDeFilmesAssistir");
};

const apagaFilme = () => {
  let campo = document.querySelector("#inputAlteraNomeFilme");
  let check = document.querySelector("#checkAlteraVistoNovoFilme");
  let idTarefa = campo.getAttribute("data-id");
  filmes = filmes.filter((t) => t.id != idTarefa);
  campo.value = "";
  check.checked = false;
  campo.removeAttribute("data-id");
  ativa("tela1");
  salvaFilmes();
  mostraFilmes("listaDeFilmesAssistir");
};

const monitoraCampoAlt = (e) => {
  let botao = document.querySelector("#btnAlt");
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const salvaFilmes = () => {
  localStorage.setItem("filmes", JSON.stringify(filmes));
};

// navigator.serviceWorker.register("./toferrado-sw.js");
