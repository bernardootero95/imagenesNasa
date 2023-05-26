import React from 'react'


const Peticion = () => {
    const [imagenes, setImagenes] = React.useState([])
    const [date, setDate] = React.useState("2000-06-16")
    
    const traerImagenes = async() =>{
        try{
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=Z7eqnPapNHR8pvsr31asqhCaExOwKewEMfiFovjo&start_date=1995-06-16&end_date=1995-06-30`)
            const json = await res.json();
            const   results = json
            setImagenes(results)     
            console.log(imagenes);         
        }catch(error){
            console.log(error)
        }   
    }
    const siguiente = () =>{
        setDate(date)
        traerImagenes()
    }
    const atras = () =>{
        setDate(date)
        traerImagenes()
    }
    return (
        <div>
          <h1>IMAGENES DEL ESPACIO POR LA NASA</h1>
          <button onClick={atras}>Atrás</button>
          <button onClick={traerImagenes}>Traer Imagenes</button>
          <button onClick={siguiente}>Siguiente</button>
      
          {imagenes?.length === 0 ? (
            <p>No hay imágenes disponibles</p>
          ) : (
            imagenes?.map(({ date, title, explanation, url }) => (
              <div key={date}>
                <h4>{date} - {title}</h4>
                <img src={url} alt={title} />
                <h4>{explanation}</h4>
              </div>
            ))
          )}
        </div>
      );
      
}

    
export default Peticion