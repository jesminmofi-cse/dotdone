import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage=()=>{
    const navigate=useNavigate();
    const [form, setForm]= useState({name: '', email:'', password:''});

    const handlerRegister= async()=>{
        if (!form.name || !form.email || !form.password) {
            alert('Please fill out all fields ✍️');
            return;
        }
        try{
            await axios.post('https://dotdone.onrender.com/api/users/register', form);
            alert('Registration successfully!');
            navigate('/login');

        }catch(err){
            console.error(err);
            const errorMsg = err.response?.data?.message || 'Registration failed 😞';
            alert(errorMsg);
        }

    };
    return (
        <div className='form'>
            <h2>Register</h2>
            <input 
            placeholder='Name' 
            onChange={(e)=>setForm({...form, name: e.target.value})}
            />
            <input 
            placeholder='Email' 
            onChange={(e)=> setForm ({...form , email:e.target.value})}
            />
            <input 
            type='password' 
            placeholder='Password' 
            onChange={(e)=> setForm({ ...form, password:e.target.value}) }
            />
            <button onClick={handlerRegister}>Register</button>
            <p className='link' onClick={()=> navigate('/login')}>Already a Pookie🎀? Login</p>
        </div>
    );
};
export default RegisterPage;

