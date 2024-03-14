import React,  {useState, useEffect} from 'react'
import { getLocations } from '../mock-api/apis'
import './Form.css';

const  Form = () => {
  const [locations, setLocations] = useState([]);
  const [userName, setUserName] = useState('');
  const [userLocation, setUserLocation] =useState('');
  const [tableData, setTableData] = useState([
    {id:1, userName: 'Big Small', location: 'USA'}
  ]);
  const [iputError, setInputError] = useState('')
  
  
  // Fetch Data from API
  useEffect(() => {
    const fetchLocations = async () =>{
      try {
        const data = await getLocations();
        setLocations(data);
      }
      catch (error) {
        console.error('Error fetching locations', error);
      }
    }
    fetchLocations();
  }, []);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  }
  
  const handleLocation = (e) => {
    setUserLocation(e.target.value)
  }

  const handleAdd = (e) => {
    e.preventDefault();
    const user = userName;
    const location = userLocation;

    if(user && location) {
      const newId = tableData.length + 1;
      setTableData([...tableData, {id: newId, userName: user, location: location}]);
    }
  }

  return (
    <div>
      <form>
        <label>Name: </label>
        <input
        type='text'
        name='name'
        placeholder='Enter name'
        onChange={handleUserName}
        className='input-select'
        />
       <label>Location: </label>
      <select className='input-select' onChange={handleLocation}>
      {locations.map(locations => (
        <option key={locations}>{locations}</option>
      ))}
      </select>
      <div className='btn'>
        <button onClick={handleAdd}>Add</button>
        <button>Clear</button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((ele) => {
            return(
            <tr key={ele.id}>
              <td>{ele.userName}</td>
              <td>{ele.location}</td>
            </tr>
          )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Form
