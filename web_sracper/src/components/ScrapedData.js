import React,{useEffect} from 'react'
import axios from "axios";


export default function ScrapedData() {
    const [data, setData] = React.useState(null);
    const [Pdata, setPData] = React.useState(null);
  
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      document.title = "Loading..."
      axios.get("http://localhost:9000/course").then((response)=>{
  
        // console.log(response)
        let array = [];
  
        response.data.map((perk, index) => {
          if (index < 6) array.push(perk);
          else return array;
        });
        // console.log(array)
        setPData(array);
        
        array = [];
        
        response.data.map((perk, index) => {
          if (index >= 6) array.push(perk);
          else return array;
        });
        // console.log(array)
        setData(array);
  
        document.title = "WebScraper"
  
      }).catch((err)=>{
        document.title = "Error"
        alert(err.message+" :: Please click on okay to proceed !!!");
        window.location.reload(false);
  
      });
  
    }, []);
  
    return (
        <>
            <h1 className="text-center mt-2 mb-5">Course List And Discription</h1>

<h3 className=" text-center mt-2 mb-5">Perks On Course</h3>

<div className="container">
  <ol className="list-group list-group-numbered">
    {!Pdata
      ?<h4 className="text-center">Data Is About Too Load &#128515;</h4> 
      : Pdata.map((user) => (
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{user.title}</div>
            </div>
            <span className="badge bg-primary rounded-pill">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-star"
                viewBox="0 0 16 16"
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
              </svg>
            </span>
          </li>
        ))}
  </ol>
</div>
<h3 className="text-center mt-2 mb-5">Course List</h3>

<div className="container">
  <table className="table">
    <thead>
      <tr>
        <th scope="col" className="text-center">
          Title{" "}
        </th>
        <th scope="col" className="text-center">
          Rating
        </th>
        <th scope="col" className="text-center">
          Decription
        </th>
      </tr>
    </thead>
    <tbody>
      {!data
        ? " "
        : data.map((user) => (
            <tr>
              <th scope="row">{user.title}</th>
              <td>{user.rating}</td>
              <td>{user.discription}</td>
            </tr>
          ))}
    </tbody>
  </table>
</div>

        </>
    )
}
