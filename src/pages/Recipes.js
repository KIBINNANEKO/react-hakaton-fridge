import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import Loading from "../atoms/Loading"
import RecipeCard from "../organisms/RecipeCard"
import useInput from "../hooks/useInput"
import { useNavigate } from "react-router-dom"
import {useStateContext} from '../context/context'

function Recipes(){

	let {isAuth} = useStateContext()

	let navigate = useNavigate()

	const [recipes, setRecipes] = useState([])
	const [myRecipes, setMyRecipes] = useState([])
	const [isLoading, setLoading] = useState(false)
	const [isDiff, setIsDiff] = useState('yes')
	const [page, setPage] = useState(1)
	
	const searchQuery = useInput('')

	useEffect(() => {
		getRecipes()
	}, [])

	function changeSort(){
		if(isDiff == 'yes') setIsDiff('no')
		else setIsDiff('yes')
	}

	const sortedPosts = useMemo(() => {
			if(isDiff == 'yes'){
				return [...recipes.sort((item1, item2) => item1.difficulty - item2.difficulty)]
			}
			else{
				return [...recipes.sort((item1, item2) => item2.difficulty - item1.difficulty)]
			}
	}, [recipes, isDiff])

	const sortedAndSearched = useMemo(() => {
		return sortedPosts.filter(item => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
	}, [searchQuery, sortedPosts])
		


	async function getRecipes(){
			setPage(1)
			setLoading(true)
			setTimeout(async () => {
				await fetch('https://fridgewebappwebhunters.azurewebsites.net/get')
				.then(res => res.json())
				.then(data => data.slice(0, 20))
				.then(slicedData => setRecipes(slicedData))
				.catch(e => console.log(e))
				setLoading(false)
			}, 300)
		}

	async function getMyRecipes(){
			setPage(2)
			setLoading(true)
			setTimeout(async () => {
				let token = sessionStorage.getItem('access_token')
				await fetch('https://fridgewebappwebhunters.azurewebsites.net/usercancook', {
					headers: {
							"Authorization":`bearer ${token}`
						}
				})
				.then(res => res.json())
				.then(data => setMyRecipes(data))
				setLoading(false)
			}, 300)
		}

	return(
		<div>
			<img className="bg__page" src={require("../assets/bg.jpg")}></img>
			<div className="container">
				<div className="recipes__block">
					<div className="recipes__title">Рецепти</div>
					<div className="button__block">
						<button onClick={getRecipes} className="button__all">Всі</button>
						<button onClick={isAuth ? getMyRecipes : () => navigate('/signIn')} className="button__my">Можу приготувати</button>
						{isDiff === 'yes'
						?<button onClick={changeSort} className="button__diff">Більш складні</button>
						:<button onClick={changeSort} className="button__diff">Менш складні</button>
						}
						
					</div>
					<div className="input__block">
						<input value={searchQuery.value} onChange={searchQuery.onChange} placeholder="Пошук рецепту.." type="text" />
					</div>
				</div>
				{ page === 1
				?
				<div className="page__recipes">
					{isLoading 
					? <Loading></Loading>
					:
					sortedAndSearched 
						?
						sortedAndSearched.map(recipe => (
							<Link key={recipe.id} to={`/recipes/${recipe.id}`}>
								<RecipeCard id={recipe.difficulty} title={recipe.name} src={recipe.image} description={recipe.description}></RecipeCard>
							</Link>
							))
						: 
						<div className="noRecipes">Рецепти не знайдені</div>
					}
				</div>
				:
				<div className="page__recipes">
					{isLoading
					? <Loading></Loading>
					:
					myRecipes 
						?
						myRecipes.map(recipe => (
							<Link key={recipe.id} to={`/recipes/${recipe.id}`}>
								<RecipeCard id={recipe.difficulty} title={recipe.name} src={recipe.image} description={recipe.description}></RecipeCard>
							</Link>
							))
						: 
						<div className="noRecipes">Рецепти не знайдені</div>
					}
				</div>
				}
			</div>
		</div>
	)
}

export default Recipes