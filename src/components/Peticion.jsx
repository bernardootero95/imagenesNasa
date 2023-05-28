import React from 'react'


const Peticion = () => {
    const [imagenes, setImagenes] = React.useState([])
    const [dateStart, setDateStart] = React.useState("1995-06-16")
    const [dateEnd, setDateEnd] = React.useState("1995-07-16")
    
    const traerImagenes = async() =>{
        try{
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=Z7eqnPapNHR8pvsr31asqhCaExOwKewEMfiFovjo&start_date=${dateStart}&end_date=${dateEnd}`)
            const json = await res.json();
            const   results = json
            setImagenes(results) 
            console.log("dateStart") 
            console.log(dateStart)
            console.log("dateEnd")
            console.log(dateEnd)
        }catch(error){
            console.log(error)
        }   
    }

    React.useEffect(() => {
        traerImagenes();
        
      }, [ dateStart, dateEnd]);
    
    
    const siguiente = () => {
        const currentDate = new Date(dateStart);
        const nextStartMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          16
        );
        const newDateStart = formatDate(nextStartMonth);
        const currentEndDate = new Date(dateEnd);
        const nextEndMonth = new Date(
          currentEndDate.getFullYear(),
          currentEndDate.getMonth() + 1,
          16
        );
        const newDateEnd = formatDate(nextEndMonth);
        setDateStart(newDateStart);
        setDateEnd(newDateEnd);
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
    };
        
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };
    return (
        <div className='container'>
            <h1 className="text-center text-primary my-4">IMÁGENES DE LA NASA</h1>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-outline-primary m-2" onClick={atras}>Atrás</button>
                <button className="btn btn-outline-primary m-2" onClick={siguiente}>Siguiente</button>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
            {
                imagenes?.map(({ date, title, explanation, hdurl }) => (
                <div className='card' style={{width: "600px"}} key={date}>
                    <img src={hdurl} className="card-img-top img-fluid" style={{  height: 'auto' }} alt={title} />
                    <div className='card-body'>
                        <h4 className='card-title'> {title} ( {date} )</h4>
                        <p className='card-text'>{explanation}</p>
                    </div>
                </div>
                ))
            }
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-outline-primary m-2" onClick={atras}>Atrás</button>
                <button className="btn btn-outline-primary m-2" onClick={siguiente}>Siguiente</button>
            </div>
            <footer className="bg-primary text-white text-center p-3 mt-5 ">
                Elaborado por Bernardo Andres Otero Jimenez
                mediante la API de la NASA - APOD:Astronomy pictureof the day
            </footer>
            
        </div>
      );
      
}

    
export default Peticion