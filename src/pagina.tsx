import React, { useState, type FormHTMLAttributes } from "react";

interface ProtutosState{
    id:number,
    nome: string,
    categoria: string,
    preco: number
    
}


function Pagina(){

    const [produtos, setProdutos] = useState<ProtutosState[]>([])


    let id:number;
    let nome: string;
    let categoria: string;
    let preco: number;

    function trataForms(){
        

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
                            {produto.id}<br />
                            {produto.nome}<br />
                            {produto.categoria}<br />
                            {produto.preco}
                        </div>
                    )
                })
                }
            </div>

            <div id="formsLocal">
                <form action="submit">
                    
                    <label htmlFor="id">Id</label>
                    <input type="text" name="id" id="inputId" />

                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="inputNome" />

                    <label htmlFor="categoria">Categoria</label>
                    <input type="text" name="categoria" id="inputCategoria" />

                    <label htmlFor="preco">Preço</label>
                    <input type="text" name="preco" id="inputPreco" />

                    <input type="submit" value="Cadastrar" onClick={trataForms}/>

                </form>
            </div>


        </main>

        <footer></footer>
    
    </>
    )

}

export default Pagina

