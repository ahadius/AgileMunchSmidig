import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signMethode} from '../fetchApi/api.js';


const Registers =() => {
     const[email, setEmail] = useState('');
     const[password, setPassword] = useState('');
     const[telephone, setTelephone] = useState('');
     const navigate = useNavigate();
   
    
     const onchangTitle=(e)=> {
         const result = e.target.value;
         setEmail(result)
     
}
const onchangArgument=(e)=> {
     const result = e.target.value;
     setPassword(result)
  
 
}
const onchangAuthor=(e)=> {
     const result = e.target.value;
     setTelephone(result)
 
}
const onSubmit=(e) =>{
     e.preventDefault()

     const obj ={
          email,
          password,
          telephone
     }
     console.log(obj)
     signMethode(obj)
     navigate('/')
   
    

}
  return (
    <div className='div-form'>
      <form className="form-group" onSubmit={onSubmit}>
      <h2>register the form</h2>
      <label>email</label>
      <input name='email' placeholder="email" type="text" value={email} onChange={onchangTitle} />
        <label>password</label>
        <input name='password' placeholder="password" type="password" value={password} onChange={onchangArgument} />
        <label>phone</label>
        <input name='phone' placeholder="phone number" type="number" value={telephone} onChange={onchangAuthor}/>
        <button type='submit'>register</button>
    </form> 
    </div>
  )
}

export default Registers