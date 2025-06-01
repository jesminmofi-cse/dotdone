import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
const LoginPage=({ setUser})=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const[password, setPassword]= useState('');
    
    const handleLogin= async ()=>{
        try{
            const res= await axios.post('http://localhost:5000/api/users/login',{email,password});
            setUser(res.data);
            navigate('/todos');
        }catch(err){
            alert('Login failed. Check credentials');
        }
    };
    return (
        <div className='form'>
            <h2>Login</h2>
            <input placeholder='Email' onChange={(e)=> setEmail(e.target.value)}/>
            <input type='password' placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
            <p className='link' onClick={()=> navigate('/register')}>New Pookie🎀? Register</p>
        </div>
    );
};
export default LoginPage;
