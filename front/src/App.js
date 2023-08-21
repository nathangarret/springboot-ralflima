import './App.css';
import Formulario from './formulario';
import Tabela from './tabela';
import React, {useEffect, useState} from 'react';

function App() {

  // Objeto Produto 
  const produto = {
    codigo : 0,
    nome : '',
    marca : ''
  }

  // useState 
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]); // [] - vetor | 
  const [objProduto, setObjProduto] = useState(produto);

  // UseEffect - requsiçao com o backend - para o front-end "fecth"
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []); // [] => Funçao do break - apenas uma vez 

  // Obtendo os dados do formlário
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  // Cadastrar o Produto
  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setProdutos([...produtos, retorno_convertido]);
        alert('Produto cadastrado com sucesso!');
        limparFormulario();
      }
    })
  }

  // Cadastrar o Produto
  const alterar = () => {
    fetch("http://localhost:8080/alterar", {
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        // mensagem 
        alert('Produto alterado com sucesso!');

        // Cópia de produtos 
        let vetorTemp = [...produtos];
        
        // Índice 
        let indice = vetorTemp.findIndex((p) =>{
          return p.codigo === objProduto.codigo; // = = = | ===
        }); // Percorre o vetor e retorna a posição da verificação

        // Alterar produto do vetorTemp 
        vetorTemp[indice] = objProduto;

        // Atualizar o vetor de produtos
        setProdutos(vetorTemp);

        // Limpar o formulário
        limparFormulario();
      }
    })
  }

  // Remover o Produto
  const remover = () => {
    fetch("http://localhost:8080/remover/"+objProduto.codigo, {
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      // Mensagem de remoção 
      alert(retorno_convertido.mensagem);

      // Cópia de produtos 
      let vetorTemp = [...produtos];
      
      // Índice 
      let indice = vetorTemp.findIndex((p) =>{
        return p.codigo === objProduto.codigo; // = = = | ===
      }); // Percorre o vetor e retorna a posição da verificação

      // Remover produto do vetorTemp 
      vetorTemp.splice(indice, 1);

      // Atualizar o vetor de produtos
      setProdutos(vetorTemp);

      // Limpar Formulário
      limparFormulario();
    })
  }

  // Limpar formulário 
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  // Selecionar Produtos 
  const selecionarProdutos = (indice) =>{
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado = {aoDigitar} cadastrar = {cadastrar} obj = {objProduto} cancelar = {limparFormulario} remover = {remover} alterar = {alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProdutos}/>    
    </div>
  );
}

export default App;
