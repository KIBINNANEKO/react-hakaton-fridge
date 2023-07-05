import MyNavLink from "../atoms/MyNavLink"
import "../styles/css/index.css"
import Button from "../atoms/SignButton"
import useInput from "../hooks/useInput"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../context/context"
import ErrorModal from "../organisms/ErrorModal"

function SignIn(){

	const {setIsAuth, setName, setLastName} = useStateContext();
	const navigate = useNavigate()

	const [modal, setModal] = useState(false)
	const [error, setError] = useState([])

	const inputEmail = useInput('')
	const inputPassword = useInput('')

	async function Login(){
		let userData = {
			"email": inputEmail.value,
			"password": inputPassword.value
		}
			let response = await fetch('https://fridgewebappwebhunters.azurewebsites.net/login', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'},
			body: JSON.stringify(userData)
			})
			
			if(response.status!==400){
				response.json().then(res=>{
				sessionStorage.setItem('userData',JSON.stringify(res))
				sessionStorage.setItem('access_token',res.access_token);
				setName(res.name)
				setLastName(res.lastname)
				setIsAuth(true)
				navigate('/ingredients')
			})}
			if(response.status == 400){
				setError(['Неправильні дані або такого користувача не існує!'])
				setModal(true)
			}
			
	}

	return(
	<div>
		<img className="bg__page" src={require("../assets/signin_bg.jpg")}></img>
		<div className="container relative">
			<div className="modal__signup">
				<h2 className="title__signup">Вхід</h2>
				<form className="signup__flex">
					<input 
						autoComplete="username"
					   autoFocus
					   type="text"
						value={inputEmail.value} 
						onChange={inputEmail.onChange} 
						className="Input Input__full" 
						placeholder="Електронна пошта">
					</input>
					<input 
						autoComplete="current-password"
						value={inputPassword.value} 
						onChange={inputPassword.onChange} 
						className="Input Input__full" 
						placeholder="Пароль" 
						type={'password'}>
					</input>
				</form>
				<div className="signup__footer">
					<div className="text">
						<p>Ще нема аккаунта?</p>
						<MyNavLink to={`/SignUp`}>Зареєструйтеся!</MyNavLink>
					</div>
					<div>
						<Button onClick={Login}>Готово!</Button>
					</div>
				</div>
			</div>
		</div>
		<ErrorModal error = {error} setModal={setModal} modal={modal}></ErrorModal>
	</div>
	)
}

export default SignIn