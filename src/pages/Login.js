import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Apis, { endpoints } from '../configs/Apis';
import cookies from 'react-cookies'
import { useDispatch } from 'react-redux';
import {loginUser} from '../ActionCreators/UserCreators'
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();


	const login = async (event) => {
		event.preventDefault();
		
		try{
			let info = await Apis.get(endpoints['oauth2-info']);
			let res = await Apis.post(endpoints['login'], {
				"client_id": info.data.client_id,
				"client_secret": info.data.client_secret,
				"username": username,
				"password": password,
				"grant_type": "password",
			})

      cookies.save("access_token", res.data.access_token)
			let user = await Apis.get(endpoints['current-user'], {
				headers: {
					'Authorization': `Bearer ${cookies.load("access_token")}`
				}
			})

			console.info(user)
      cookies.save("user", user.data)

      dispatch(loginUser(user.data))
      navigate('/');

		}catch(err){
			console.error(err);
		}
	}
	return (
		<>
			<Form onSubmit={login} style={{maxWidth: "500px", display: "flex", flexDirection: "column", margin: "10% auto"}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
	)
}
