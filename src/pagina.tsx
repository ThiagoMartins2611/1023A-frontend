import React, { useState, type ChangeEvent, type FormHTMLAttributes, type InputHTMLAttributes } from "react";
import './pagina.css'

interface ProdutosState{
    id:number,
    nome: string,
    categoria: string,
    preco: number
    
}

//inputInfo base 

function Pagina(){

    const [produtos, setProdutos] = useState<ProdutosState[]>([])
    const [inputObj, setInputObj] = useState<ProdutosState>({
        id: 0,
        nome: "",
        categoria: "",
        preco: 0
    })



    function inputForms(event:React.ChangeEvent<HTMLInputElement>){ 
        
        const name = event.currentTarget.name as keyof ProdutosState;
        const valueDigitado = event.currentTarget.value;

        const valueFormatado = valueDigitado.replace(",", ".")
        let number;

        if(name == "id"){
            number = Math.trunc(parseFloat(valueFormatado));
            
        }else if(name == "preco"){  
            number == parseFloat(valueFormatado);
        }
        

        setInputObj({
            ...inputObj,
            [name]: (name === "preco" || name === "id") ? number: valueDigitado
            
        })
        
    }



    function trataForms(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault()

        setProdutos([...produtos, inputObj])
        limparFormulario();
    }

    function limparFormulario(){
        setInputObj({
            id: 0,
            nome: "",
            categoria: "",
            preco: 0
        })
    }

 


    return(<>

        <header>
            <div>Logo</div>
            <nav>
                <ul>

                    <li>
                        <a href="">Home</a>
                    </li>

                    <li>
                        <a href="">Genero</a>
                    </li>

                    <li>
                        <a href="">Sobre</a>
                    </li>

                </ul>
            </nav>
        </header>

        <main id="main">

            <div id="listLocal">
                {produtos.map(produto=>{
                    return(
                        <div className="produto">
                            ID: {produto.id}<br />
                            NOME: {produto.nome}<br />
                            CATEGORIA: {produto.categoria}<br />
                            PREÇO: {produto.preco}
                        </div>
                    )
                })
                }
            </div>

            <div id="formsLocal">
                <form action="submit" onSubmit={trataForms}>
                    
                    <label htmlFor="id">Id</label>
                    <input type="text" name="id" id="inputId" value={
                        
                            Number.isNaN(inputObj.id) ? setInputObj({...inputObj, id: 0}) : inputObj.id as any
       
                        } onChange={inputForms} />

                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="inputNome" value={inputObj.nome} onChange={inputForms} />

                    <label htmlFor="categoria">Categoria</label>
                    <input type="text" name="categoria" id="inputCategoria" value={inputObj.categoria} onChange={inputForms} />

                    <label htmlFor="preco">Preço</label>
                    <input type="text" name="preco" id="inputPreco" value={
                        
                         Number.isNaN(inputObj.preco) ? setInputObj({...inputObj, preco: 0}) : inputObj.preco as any

                    } onChange={inputForms} />

                    <input type="submit" value="Cadastrar" />

                </form>
            </div>


        </main>

        <footer></footer>
    
    </>
    )

}

export default Pagina

