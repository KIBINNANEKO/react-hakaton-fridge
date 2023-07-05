import Loading from "../atoms/Loading"
import "../styles/css/index.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import HomeRecipeCard from "../organisms/HomeRecipeCard"

function Home(){

	const [recipes, setRecipes] = useState([])
	const [isLoading, setLoading] = useState(false)
	

	useEffect(() => {
		getRecipes()
	}, [])


	async function getRecipes(){
			setLoading(true)
			setTimeout(async () => {
				await fetch('https://fridgewebappwebhunters.azurewebsites.net/get')
				.then(res => res.json())
				.then(data => data.slice(0, 6))
				.then(slicedData => setRecipes(slicedData.reverse()))
				.catch(e => console.log(e))
				setLoading(false)
			}, 300)
		}

	return(
		<div>
			<img className="bg__page" src={require("../assets/bg.jpg")}></img>
			<div className="container">
				<div className="main__title">Рекомендуємо!</div>
					<div className="page__home">
						{isLoading 
						? <Loading></Loading>
						:
						recipes 
							?
							recipes.map(recipe => (
								<Link key={recipe.id} to={`/recipes/${recipe.id}`}>
									<HomeRecipeCard description={recipe.description} id={recipe.id} title={recipe.name} src={recipe.image}></HomeRecipeCard>
								</Link>
								))
							: 
							<div className="noRecipes">Рецепти не знайдені</div>
						}
						
					</div>
			</div>
		</div>
	)

}

export default Home