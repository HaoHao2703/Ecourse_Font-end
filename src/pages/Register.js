import React, { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Apis, { endpoints } from '../configs/Apis';

export default function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const avatar = useRef();
  const navigate = useNavigate();


  const register = (event) => {
    event.preventDefault();

    let registerUser = async () => {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      formData.append("avatar", avatar.current.files[0]);

      try{
        await Apis.post(endpoints["register"], formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        navigate('/login');
      }catch(err){
        console.error(err)
      }
    }
    if(password !== null && password === confirmPassword){
      registerUser();
    }
  }
  return (
    <>
      <div>Register</div>
      

      <Form onSubmit={register} style={{width: "500px", display: "flex", flexDirection: "column", margin: "0 auto"}}>
        <RegisterForm id={firstName}
                      placeholder="First Name"
                      type="text"
                      value={firstName}
                      change={(event) => setFirstName(event.target.value)}/>
        <RegisterForm id={lastName}
                      placeholder="Last Name"
                      label={lastName}
                      type="text"
                      value={lastName}
                      change={(event) => setLastName(event.target.value)}/>
        <RegisterForm id={username}
                      placeholder="Username"
                      label={username}
                      type="text"
                      value={username}
                      change={(event) => setUsername(event.target.value)}/>
        <RegisterForm id={email}
                      placeholder="Email"
                      label={email}
                      type="email"
                      value={email}
                      change={(event) => setEmail(event.target.value)}/>
        <RegisterForm id={password}
                      placeholder="Password"
                      label={password}
                      type="password"
                      value={password}
                      change={(event) => setPassword(event.target.value)}/>
        <RegisterForm id={confirmPassword}
                      placeholder="Confirm Password"
                      label={confirmPassword}
                      type="password"
                      value={confirmPassword}
                      change={(event) => setConfirmPassword(event.target.value)}/>

        <Form.Group className="mb-3" controlId="avatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" 
                        ref={avatar}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  )
}

const RegisterForm = (props) => {
  return(
    <>
    <Form.Group className="mb-3" controlId={props.id}>
      {/* <Form.Label>{props.label}</Form.Label> */}
      <Form.Control type={props.type} 
                    value={props.value}
                    onChange={props.change}
                    placeholder={props.placeholder}/>
     </Form.Group>
    </>
  )
}
