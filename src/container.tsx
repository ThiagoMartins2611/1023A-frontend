
/*

Componente --> uma função reutilisavel que retorna JSX, JavaScript com XML (linguagem de marcação de texto)


States --> São estados da estrutura/infromações que podem ser alteradas 
           e que serem alterados no codigo pelo setState, 
           ele atuliza o componente.

Props --> são informações que vc pode passar para um componente, passar parametros

Hooks


*/

 

interface ContainerProps{
    nome:string
}

function Container(props:ContainerProps){
    let contador = 10;
    
    

    function mudar(){
        contador += 1
    }
    
    
    return( 
        <>
        
            <h1>{props.nome}</h1>
            valor Contado: {contador}
            <button onClick={mudar()}></button>
        
        </>
    )
}

export default Container