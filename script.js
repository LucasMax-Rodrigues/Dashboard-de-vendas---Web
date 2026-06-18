// Elementos da Tela
const formProduto = document.getElementById('form-produto');
const inputNome = document.getElementById('nome');
const inputPreco = document.getElementById('preco');
const listaProdutosHTML = document.getElementById('lista-produtos');

// Elementos de Analytics (Cards)
const elMedia = document.getElementById('media-preco');
const elCaro = document.getElementById('produto-caro');
const elBarato = document.getElementById('produto-barato');

// Sons
const somSucesso = document.getElementById('som-sucesso');
const somVenda = document.getElementById('som-venda');

// Banco de dados em memória (Array de Objetos)
let produtos = [];

// Função para calcular e atualizar os cartões de análise
function atualizarAnalise() {
    if (produtos.length === 0) {
        elMedia.textContent = "R$ 0,00";
        elCaro.textContent = "—";
        elBarato.textContent = "—";
        return;
    }

    // 1. Calcular Média Geral
    const somaTotal = produtos.reduce((acumulador, item) => acumulador + item.preco, 0);
    const media = somaTotal / produtos.length;
    elMedia.textContent = `R$ ${media.toFixed(2).replace('.', ',')}`;

    // 2. Achar o Mais Caro e Mais Barato usando reduce
    const maisCaro = produtos.reduce((max, item) => item.preco > max.preco ? item : max, produtos[0]);
    const maisBarato = produtos.reduce((min, item) => item.preco < min.preco ? item : min, produtos[0]);

    elCaro.textContent = `${maisCaro.nome} (R$ ${maisCaro.preco.toFixed(2).replace('.', ',')})`;
    elBarato.textContent = `${maisBarato.nome} (R$ ${maisBarato.preco.toFixed(2).replace('.', ',')})`;
}

// Função para desenhar a lista de produtos na tabela
function renderizarProdutos() {
    listaProdutosHTML.innerHTML = ""; // Limpa a tabela

    produtos.forEach((produto, index) => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td><strong>${produto.nome}</strong></td>
            <td>R$ ${produto.preco.toFixed(2).replace('.', ',')}</td>
            <td>
                <button class="btn-vender" onclick="venderProduto(${index})">Marcar Vendido</button>
            </td>
        `;

        listaProdutosHTML.appendChild(linha);
    });

    atualizarAnalise();
}

// Evento de Cadastro de Novo Produto
formProduto.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Impede o envio padrão da página

    const novoProduto = {
        nome: inputNome.value.trim(),
        preco: parseFloat(inputPreco.value)
    };

    // Adiciona ao array
    produtos.push(novoProduto);

    // Efeito Sonoro de Sucesso ao Adicionar
    somSucesso.currentTime = 0;
    somSucesso.play();

    // Limpa os campos do formulário e foca no nome
    formProduto.reset();
    inputNome.focus();

    // Atualiza a interface
    renderizarProdutos();
});

// Função para Excluir/Vender Produto (chamada pelo botão na tabela)
window.venderProduto = function(index) {
    // Som de caixa registradora ao dar baixa
    somVenda.currentTime = 0;
    somVenda.play();

    // Remove do array pelo índice
    produtos.splice(index, 1);

    // Atualiza a interface
    renderizarProdutos();
};