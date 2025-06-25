import React, { useEffect, useState, type ChangeEvent, type FormHTMLAttributes, type InputHTMLAttributes } from "react";
import './pagina.css'

interface ProdutosState{
    id:number,
    nome: string,
    categoria: string,
    preco: number
    
}

interface mensagem{
    erroDoServidor:string,
    erro:string,
    erroDataBase:string,
    connServidor:string,
    inputSemValor:string
    
    
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

    const [mensagem, setMensagem] = useState<mensagem>({
        erroDoServidor: "",
        erro: "erro",
        erroDataBase: "",
        connServidor:"",
        inputSemValor: ""
    })




    useEffect(()=>{

        async function buscaDados(){

           try {
                const res = await fetch("http://localhost:8000/ShowProdutos");
            
                if(res.status===200){
                    const dados = await res.json()
                    setProdutos(dados.dados)

                    console.log(dados.mensagem)

                }

                if(res.status===400){
                    setMensagem({
                        ...mensagem,
                        erroDoServidor: "Falha ao receber resposta do servidor"
                    })
                }
            
           } catch (error) {
                setMensagem({
                    ...mensagem,
                    erroDataBase:"Erro ao conectar com o banco"
                })
           } 
        
        }
        buscaDados();

    }, []);




    function inputForms(event:React.ChangeEvent<HTMLInputElement>){ 
        
        const name = event.currentTarget.name as keyof ProdutosState;
        const valueDigitado = event.currentTarget.value;

        
        const number = parseInt(valueDigitado);


        setInputObj({
            ...inputObj,
            [name]: (name === "id") ? number : valueDigitado
            
        })
   
    }



    async function trataForms(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault()


        if(
            inputObj.id != 0 &&
            inputObj.nome != "" &&
            inputObj.categoria != "" &&
            inputObj.preco != 0
        ){

            setInputObj({
                ...inputObj,
                preco: inputObj.preco
            })

            setProdutos([...produtos, inputObj])
            limparFormulario();
             setMensagem({
                ...mensagem,
                inputSemValor: ""
            })

            const res = fetch("http://localhost:8000/SalvarProdutos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(inputObj)
            })

            if((await res).status === 200){
                setMensagem({
                    ...mensagem,
                    connServidor: "Produtos enviados ao servidor"
                })
                
                setTimeout(() => {
                    setMensagem({
                        ...mensagem,
                        connServidor: ""
                    })
                }, 5000);
            }
            
            

        }else{
            setMensagem({
                ...mensagem,
                inputSemValor: "Por favor preencher todos os espaços"
            })
        }
        
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
            <div className="logo">Logo</div>
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

                {mensagem.inputSemValor &&
                    <div id="inputErro">
                        <h3>{mensagem.inputSemValor}</h3>
                    </div>
                }
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
                    <input type="number" name="preco" id="inputPreco" value={inputObj.preco} onChange={inputForms} />

                    <input type="submit" value="Cadastrar" />

                </form>

                   {mensagem.erroDataBase || mensagem.erroDoServidor &&
                        <>
                        <div id="errosDoServidor">
                            <h3>{mensagem.erroDataBase}</h3>
                            <h3>{mensagem.erroDoServidor}</h3>
                        </div>
                        </>
                    }

                {
                    mensagem.connServidor &&

                    <div id="boasDoServidor">
                        <h3>{mensagem.connServidor}</h3>
                    </div>
                }
            </div>

        </main>

        <footer></footer>
    
    </>
    )

}

export default Pagina

