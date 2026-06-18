const formProduto = document.getElementById('form-produto');
const inputNome = document.getElementById('nome');
const inputPreco = document.getElementById('preco');
const listaProdutosHTML = document.getElementById('lista-produtos');

const elMedia = document.getElementById('media-preco');
const elCaro = document.getElementById('produto-caro');
const elBarato = document.getElementById('produto-barato');

const somSucesso = document.getElementById('som-sucesso');
const somVenda = document.getElementById('som-venda');

let produtos = [];

function atualizarAnalise() {
    if (produtos.length === 0) {
        elMedia.textContent = "R$ 0,00";
        elCaro.textContent = "—";
        elBarato.textContent = "—";
        return;
    }

    const somaTotal = produtos.reduce((acumulador, item) => acumulador + item.preco, 0);
    const media = somaTotal / produtos.length;
    elMedia.textContent = `R$ ${media.toFixed(2).replace('.', ',')}`;

    const maisCaro = produtos.reduce((max, item) => item.preco > max.preco ? item : max, produtos[0]);
    const maisBarato = produtos.reduce((min, item) => item.preco < min.preco ? item : min, produtos[0]);

    elCaro.textContent = `${maisCaro.nome} (R$ ${maisCaro.preco.toFixed(2).replace('.', ',')})`;
    elBarato.textContent = `${maisBarato.nome} (R$ ${maisBarato.preco.toFixed(2).replace('.', ',')})`;
}

function renderizarProdutos() {
    listaProdutosHTML.innerHTML = ""; 

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

formProduto.addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    const novoProduto = {
        nome: inputNome.value.trim(),
        preco: parseFloat(inputPreco.value)
    };

    produtos.push(novoProduto);

    somSucesso.currentTime = 0;
    somSucesso.play();

    formProduto.reset();
    inputNome.focus();

    renderizarProdutos();
});

window.venderProduto = function(index) {
    somVenda.currentTime = 0;
    somVenda.play();

    produtos.splice(index, 1);
    renderizarProdutos();
};
