
import { useState } from "react";
/*

Componente --> uma função reutilisavel que retorna JSX, JavaScript com XML (linguagem de marcação de texto)


States --> São estados da estrutura/infromações que podem ser alteradas 
           e que serem alterados no codigo pelo setState, 
           ele atuliza o componente.

Props --> são informações que vc pode passar para um componente, passar parametros

Hooks --> iniciam com "use" e só pode usar ele no começo do componente

useState = devolve uma variavel e uma função setVariavel
            setVariavel serve para alterar o valor da variavel, ela serve
            para que o progama veja se é preciso renderizar


*/


interface ContainerProps{
    nome:string
}

function Container(props:ContainerProps){
    const [texto, setTexto] = useState("Coloque um texto")

        function trataInput(event:React.ChangeEvent<HTMLInputElement>){
            setTexto(event.currentTarget.value)
        }
    
    return( 
        <>
        
            <h1>{props.nome}</h1>
            texto: {texto}
            <br />
           
            <input type="text" placeholder="Mostrar Texto" onChange={trataInput}/>

        </>
    )
}

export default Container