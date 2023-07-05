import MyNavLink from "../atoms/MyNavLink"
import "../styles/css/index.css"
import Button from "../atoms/SignButton"
import useInput from "../hooks/useInput"
import registerValidation from "../validations/registerValidation"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ErrorModal from "../organisms/ErrorModal"

function SignUp(){
	const navigate = useNavigate()
	const [errors, setErrors] = useState([])
	const [modal, setModal] = useState(false)

	const inputEmail = useInput('')
	const inputPassword = useInput('')
	const inputRepeatPassword = useInput('')
	const inputFirstName = useInput('')
	const inputLastName = useInput('')

	async function Submit(){
		let error = registerValidation(inputEmail.value, inputPassword.value, inputRepeatPassword.value, inputFirstName.value, inputLastName.value) 
		if(error.length === 0){
			let userData = {
				"name": inputFirstName.value,
				"lastname": inputLastName.value,
				"email": inputEmail.value,
				"password": inputPassword.value
			}
			let response = await fetch('https://fridgewebappwebhunters.azurewebsites.net/registration', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json'
				},
				body: JSON.stringify(userData)
				
			})
			if(response.status == 200){
				navigate('/signIn')
			}
			else{
				error = ['Щось пішло не так..']
				setModal(true)
			}
		}
		else{
			setErrors(error)
			setModal(true)
		}
	}

	return(
	<div>
		<img className="bg__page" src={require("../assets/signup_bg.jpg")}></img>
		<div className="container relative">
			<div className="modal__signup">
				<h2 className="title__signup">Реєстрація</h2>
				<form className="signup__flex">
					<input 
						autoFocus
					   type="text"
						value={inputEmail.value} 
						onChange={inputEmail.onChange} 
						className="Input Input__full" 
						placeholder="Електронна пошта">
					</input>
					<div className="flex Input__full">
						<input 
						   type="text"
							value={inputFirstName.value} 
							onChange={inputFirstName.onChange} 
							className="Input Input__half" 
							placeholder="Ім'я">
						</input>
						<input 
						   type="text"
							value={inputLastName.value} 
							onChange={inputLastName.onChange} 
							className="Input Input__half" 
							placeholder="Прізвище">
						</input>
					</div>
					<input 
					   autoComplete="new-password"
						value={inputPassword.value} 
						onChange={inputPassword.onChange} 
						className="Input Input__full" 
						placeholder="Пароль" 
						type={'password'}>
					</input>
					<input 
						autoComplete="new-password"
						value={inputRepeatPassword.value} 
						onChange={inputRepeatPassword.onChange} 
						className="Input Input__full" 
						placeholder="Повторіть пароль" 
						type={'password'}>
					</input>
				</form>
				<div className="signup__footer">
					<div className="text">
						<p>У вас вже є аккаунт?</p>
						<MyNavLink  to={`/SignIn`}>Увійдіть!</MyNavLink>
					</div>
					<div>
						<Button onClick={Submit}>Готово!</Button>
					</div>
				</div>
			</div>
		</div>
		<ErrorModal error = {errors} setModal={setModal} modal={modal}></ErrorModal>
	</div>
	)
}

export default SignUp