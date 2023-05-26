import React from 'react'


const Peticion = () => {
    const [imagenes, setImagenes] = React.useState([])
    const [dateStart, setDateStart] = React.useState("1995-06-16")
    const [dateEnd, setDateEnd] = React.useState("1995-06-30")
    
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
        setDateStart((prevDateStart) => getNextMonthDate(prevDateStart));
        setDateEnd((prevDateEnd) => getNextMonthDate(prevDateEnd));
        traerImagenes()
    };
      


    const atras = () => {
        const currentDate = new Date(dateStart);
        const prevMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          16
        );
        const newDateStart = formatDate(prevMonth);
        const newDateEnd = dateStart;
        if (newDateStart < "1995-06-16") {
          setDateStart("1995-06-16");
          setDateEnd("1995-07-15");
        } else {
          setDateStart(newDateStart);
          setDateEnd(newDateEnd);
        }
        traerImagenes()
    };
    
    const getNextMonthDate = (date) => {
        const currentDate = new Date(date);
        const nextMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          16
        );
        return formatDate(nextMonth);
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