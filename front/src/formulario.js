// Alterar, Remover e Adicionar o Produto
function Formulario({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}){
    return(
        <form>
            <input type='text' onChange={eventoTeclado} value={obj.nome} name="nome" placeholder='Nome' className='form-control' />
            <input type='text' onChange={eventoTeclado} value={obj.marca} name="marca" placeholder='Marca' className='form-control' />

            {
                botao
                ?
               <input type='button' value='Cadastrar' onClick={cadastrar} className='btn btn-primary'/> 
               :
               <div>
                    <input type='button' onClick={alterar} value='Alterar' className='btn btn-warning'/>
                    <input type='button' onClick={remover} value='Remover' className='btn btn-danger'/>
                    <input type='button' onClick={cancelar} value='Cancelar' className='btn btn-secondary'/>
               </div>
            }
        </form>
    )
}

export default Formulario;
