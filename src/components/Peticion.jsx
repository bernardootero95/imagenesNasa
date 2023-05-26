import React from 'react'


const Peticion = () => {
    const [imagenes, setImagenes] = React.useState([])
    const [count, setCount] = React.useState(0)
    
    const traerImagenes = async() =>{
        try{
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=Z7eqnPapNHR8pvsr31asqhCaExOwKewEMfiFovjo&count=${count}`)
            const {results} = await res.json()
            setImagenes(results)
        }catch(error){
            console.log(error)
        }   
    }
    const siguiente = () =>{
        setCount(count+10)
        traerImagenes()
    }
    return (
    <div>Peticion</div>
        
    )
}

    
export default Peticion