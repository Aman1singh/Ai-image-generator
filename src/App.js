import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const App =()=>{
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const surpriseOptions=[
    'Twinkle Twinkle Little Star ',
   ' how I wonder what you are '
  ]
  const surpriseMe =()=>{
    const randomValue = surpriseOptions[Math.floor(Math.random()*surpriseOptions.length)]
    setValue()
  }
  const getImages= async()=>{
    try{
      const options={
        method:'POST',
        body:JSON.stringify({
          message: value
        }),
        headers:{
          "Content-type":"application/json"
        }
        
      }
      const response = await fetch('http://localhost:8000/images',options)
      const data=await response.json()
      console.log(data)
      setImages(data)
    }
    catch(error){
      console.error(error)
    }
  }
  console.log(value)
  return (
    <div className="app">
      <section className="search-section">
        <p>Start with a detailed description 
          
          </p>
          <div className="input-container">

            <input 
             value={value}
             placeholder="Enter the image which you want with detailed description"
             onChange = {e =>setValue(e.target.value)}/>
            
            <button onClick={getImages}className="btn btn-outline-secondary">Generate</button>
          </div>
      </section>
      <section className="image-section">{
        images?.map((images,_index)=>(
          <img key ={_index}src={images.url} alt={'Generated image of ${value}'}/>
        ))
      }

      </section>
      <section>
      <footer>
        <div className='f1'>
      
  <p>  
    Copyright &copy;  2023
  </p>
    
    </div>
      </footer></section>
    </div>
  );
}

export default App;
