import React from 'react'


const Peticion = () => {
    const [imagenes, setImagenes] = React.useState([])
    const [dateStart, setDateStart] = React.useState("1995-06-16")
    const [dateEnd, setDateEnd] = React.useState("1995-06-25")
    
    const traerImagenes = async() =>{
        try{
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=Z7eqnPapNHR8pvsr31asqhCaExOwKewEMfiFovjo&start_date=${dateStart}&end_date=${dateEnd}`)
            const json = await res.json();
            const   results = json
            setImagenes(results)             
        }catch(error){
            console.log(error)
        }   
    }
    const siguiente = () => {
        const currentDateStart = new Date(dateStart);
        const currentDateEnd = new Date(dateEnd);
        currentDateStart.setDate(currentDateStart.getDate() + 10);
        currentDateEnd.setDate(currentDateEnd.getDate() + 10);
        const formattedDateStart = formatDate(currentDateStart);
        const formattedDateEnd = formatDate(currentDateEnd);
        setDateStart(formattedDateStart);
        setDateEnd(formattedDateEnd);
        traerImagenes();
      };
    
      const atras = () => {
        const currentDateStart = new Date(dateStart);
        const currentDateEnd = new Date(dateEnd);
        currentDateStart.setDate(currentDateStart.getDate() - 10);
        currentDateEnd.setDate(currentDateEnd.getDate() - 10);
        const formattedDateStart = formatDate(currentDateStart);
        const formattedDateEnd = formatDate(currentDateEnd);
        setDateStart(formattedDateStart);
        setDateEnd(formattedDateEnd);
        traerImagenes();
      };

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      };
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
                <h3>{date} - {title}</h3>
                <img src={url} alt={title} />
                <h4>{explanation}</h4>
              </div>
            ))
          )}
        </div>
      );
      
}

    
export default Peticion