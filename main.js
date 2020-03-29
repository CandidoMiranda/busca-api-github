var inputElement = document.querySelector('input');
var btnElement = document.querySelector('button');
var listElement = document.querySelector('ul');


function buscar (nome) {
  carregando();
  axios.get('https://api.github.com/users/'+nome+'/repos')
    .then(function(response) {
      limpaTela();
      var repos = response.data;
      for (repo of repos) {
        var liElement = document.createElement('li');
        var textElement = document.createTextNode(response.data[repos.indexOf(repo)].name);
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', response.data[repos.indexOf(repo)].html_url);
        linkElement.appendChild(textElement)
        liElement.appendChild(linkElement);
        listElement.append(liElement);
      }
    })
    .catch(function(error) {
      limpaTela();
      var liElement = document.createElement('li');
      var textElement = document.createTextNode('Erro: O usuário '+nome+' não existe.');
      liElement.appendChild(textElement);
      listElement.appendChild(liElement);
    });
}

function carregando () {
  limpaTela()
  var textElement = document.createTextNode('Carregando...');
  var loadingElement = document.createElement('li');

  loadingElement.appendChild(textElement);
  listElement.appendChild(loadingElement);
}

btnElement.onclick = function () {
  buscar(inputElement.value);
  inputElement.value = '';
}

function limpaTela() {
  listElement.innerHTML = '';
}