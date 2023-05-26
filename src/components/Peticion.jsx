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

    React.useEffect(() => {
        traerImagenes();
      }, [dateStart, dateEnd]);
    
    
    const siguiente = () => {
        setDateStart((prevDateStart) => getNextMonthDate(prevDateStart));
        setDateEnd((prevDateEnd) => getNextMonthDate(prevDateEnd));
    
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
        <div className='container'>
            <h1 className="text-center text-primary my-4">IMÁGENES DE LA NASA</h1>
            <div className="position-absolute top-0 start-0">
                <button className="btn btn-outline-primary m-2 ">Atrás</button>
            </div>
            <div className="position-absolute top-0 end-0">
                <button className="btn btn-outline-primary m-2">Siguiente</button>
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
            <footer className="bg-primary text-white text-center p-3 mt-5 ">
                Elaborado por Bernardo Andres Otero Jimenez
                mediante la API de la NASA - APOD:Astronomy pictureof the day
            </footer>
        </div>
      );
      
}

    
export default Peticion