fetch("http://localhost:8080/bolsistas")
.then(function(response) {
    return response.json();
})
.then(function(bolsistas) {
    console.log(bolsistas)
    let placeholder = document.querySelector("#tabela");
    let out = "";
    for(let bolsista of bolsistas) {
        out += `
        <tr class="align-middle">
            <td>
                <div class="d-flex align-items-center">
                    <div>
                        <div class="h6 mb-0 lh-1">${bolsista.nome}</div>
                    </div>
                </div>
            </td>
            <td>${bolsista.identificador}</td>
            <td>${bolsista.numeroIdentificador}</td>
            <td>${bolsista.banco} - ${bolsista.agencia}</td>
            <td>${bolsista.dtCadastro}</td>
            <td>
                <ul class="list-unstyled mb-0 d-flex justify-content-end">
                    <li class="mr-3" style="padding-right: 10px;">
                        <a class="navbar-brand"  data-bs-toggle="modal" data-bs-target="#VisualizarBolsistaModal" onclick="visualizarBolsista(${bolsista.id})">
                            <i class="bi-eye-fill"></i>
                        </a>
                    </li>
                    <li class="mr-3" style="padding-right: 10px;">
                        <a class="navbar-brand" data-bs-toggle="modal" data-bs-target="#AltBolsistaModal" onclick="carregarBolsista(${bolsista.id})">
                            <i class="bi bi-pen"></i>
                        </a>
                    </li>
                    <li class="mr-3" style="padding-right: 10px;">
                        <a class="navbar-brand">
                            <i class="bi bi-trash" onclick="deletarBolsista(${bolsista.id})"></i>
                        </a>
                    </li>
                </ul>
            </td>
        </tr>
    `
    }

    placeholder.innerHTML = out;
})

function incluirBolsista() {
    
    var nome = document.getElementById("nome").value;

    var select = document.getElementById('dsIdentificador')
    var opcaoText = select.options[select.selectedIndex].text;
    var identificador = opcaoText;

    var numeroIdentificador = document.getElementById("numIdent").value;

    var selectBanco = document.getElementById('dsBanco')
    var opcaoTextBanco = selectBanco.options[selectBanco.selectedIndex].text;

    var agencia = document.getElementById("agencia").value;
    var conta = document.getElementById("conta").value;
    /*var dtCadastro = obterDataCad();*/

    /*console.log(dtCadastro);*/

    var dados = {
        nome: nome,
        identificador: identificador,
        numeroIdentificador : numeroIdentificador,
        banco: opcaoTextBanco,
        agencia: agencia,
        conta: conta,
       /* dtCadastro: dtCadastro*/
    };

    var requestOtions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    };

    fetch('http://localhost:8080/bolsistas', requestOtions)
        .then(response => response.json())
        .then(data => {
            console.log('Resposta da API:', data);
        })
        .catch(error => console.error('Erro na requisição:', error));
    
    window.location.reload();
}

function deletarBolsista(id) {

    var apiUrl = 'http://localhost:8080/bolsistas/' + encodeURIComponent(id);
    console.log(id, apiUrl)

    var requestOtions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(apiUrl, requestOtions)
    .then(response => {
        if(!response.ok) {
            throw new Error('Erro ao excluir bolsista');
        }
        console.log('Bolsista excluido com sucesso');
    })
    .catch(error => console.log('Erro na requisição:', error));
    window.location.reload();
}

function carregarBolsista(id) {
    var apiUrl = 'http://localhost:8080/bolsistas/' + encodeURIComponent(id);

    fetch(apiUrl)
    .then(response => {
        if(!response.ok) {
            throw new Error('Error ao buscar bolsista');
        }

        return response.json();
    })
    .then(data => {
        document.getElementById("modalId").value = data.id;
        document.getElementById("modalNome").value = data.nome;
        /*document.getElementById("modalDsIdentificador").value = data.identificador;*/
        document.getElementById("modalNumIdentificador").value = data.numeroIdentificador;
        document.getElementById("modalDsBanco").value = data.banco;
        document.getElementById("modalAgencia").value = data.agencia;
        document.getElementById("modalConta").value = data.conta;
        /*document.getElementById("modalDtCadastro").value = data.dtCadastro;*/
    })
    .catch(error => console.error('Erro na requisoção:', error));
}

function alterarBolsista(id) {

    var id = document.getElementById("modalId").value;
    var apiUrl = 'http://localhost:8080/bolsistas/' + encodeURIComponent(id);
    var nome = document.getElementById("modalNome").value;
    
    var select = document.getElementById('dsIdentificador')
    var opcaoText = select.options[select.selectedIndex].text;
    var identificador = opcaoText;
    
    var selectBanco = document.getElementById('dsBanco')
    var opcaoTextBanco = selectBanco.options[selectBanco.selectedIndex].text;
    
    var numeroIdentificador = document.getElementById("modalNumIdentificador").value;
    var agencia = document.getElementById("modalAgencia").value;
    var conta = document.getElementById("modalConta").value;

    var dados = {
        nome: nome,
        identificador: identificador,
        numeroIdentificador : numeroIdentificador,
        /*banco: opcaoTextBanco,*/
        agencia: agencia,
        conta: conta
    };
    
    var requestOtions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    };

    fetch(apiUrl, requestOtions)
    .then(response => {
        console.log(response)
        if(!response.ok) {
            throw new Error('Erro ao alterar bolsista');
        }
        console.log('Bolsista alterado com sucesso');
        window.location.reload();
    })
    .catch(error => console.log('Erro na requisição:', error));
}

function visualizarBolsista(id) {
    var apiUrl = 'http://localhost:8080/bolsistas/' + encodeURIComponent(id);

    fetch(apiUrl)
    .then(response => {
        if(!response.ok) {
            throw new Error('Error ao buscar bolsista');
        }

        return response.json();
    })
    .then(data => {
        document.getElementById("modalVId").value = data.id;
        document.getElementById("modalVNome").value = data.nome;

        var tpDoc = document.getElementById("tpDoc");
        tpDoc.options[tpDoc.selectedIndex].text = data.identificador;

        document.getElementById("modalVNumIdentificador").value = data.numeroIdentificador;

        var dsBanco = document.getElementById("dsBanco");
        dsBanco.options[dsBanco.selectedIndex].text = data.identificador;

        document.getElementById("modalVAgencia").value = data.agencia;
        document.getElementById("modalVConta").value = data.conta;
    })
    .catch(error => console.error('Erro na requisoção:', error));
}

function obterDataCad () {
    var data = new Date();
    var ano = data.getFullYear();
    var mes = data.getMonth() + 1;
    var dia = data.getDate();
    var horas = data.getHours();
    var minutos = data.getMinutes();
    var segundos = data.getSeconds();

    return `${ano}-${mes}-${dia}`+'T'+`${horas}:${minutos}:${segundos}`;
}