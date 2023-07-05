import DropDownList from '../atoms/Drop-Down-List'
import { useState, useEffect } from 'react'
import Loading from '../atoms/Loading'
import IngredientCard from '../organisms/IngredientCard'

function Ingredients(){

	const [filter, setFilter] = useState('all')
	const [ingredients, setIngredients] = useState([])
	const [filtered, setFiltered] = useState([])
	const [isLoading, setLoading] = useState(false)

		useEffect(() => {
			getMyIngredients()
		}, [])

	async function getMyIngredients(){
		setLoading(true)
		setTimeout(async () => {
			let token=sessionStorage.getItem('access_token');
			let response = await fetch(`https://fridgewebappwebhunters.azurewebsites.net/getMyIngredients`, {
			method: 'GET',
			headers:{
					"Authorization":`bearer ${token}`
			}
			}).
			then(data => data.json()).
			then(jsData => {
				setIngredients(jsData) 
				setFiltered(jsData)})
			setLoading(false)
		}, 300)

	}

	function filterInredients(filter){
		setFilter(filter)
		if (filter === 'all'){
			setFiltered([...ingredients])
		}
		else{
			setFiltered([...ingredients.filter(item => item.item1.categoryId === filter)])
		}
	}

	return(
		<>
			<img className="bg__page" src={require("../assets/bg.jpg")}></img>
			<div className="container">
				<h2 className='main__title'>Мій холодильник</h2>
				<div className='ingridients__page'>
					<div className='page__tabs'>
						<DropDownList
							value={filter}
							onChange={filterInredients}
							options={[
								{value: 'all', name: "Усі"},
								{value: 10, name: "Молочні"},
								{value: 11, name: 'Хлібобулочні'},
								{value: 12, name: "М'ясні"},
								{value: 13, name: "Алкогольні"},
								{value: 14, name: "Ковбасні"},
								{value: 15, name: "Солодощі"},
								{value: 16, name: "Овочі"},
								{value: 17, name: "Фрукти"},
								{value: 18, name: "Інше"}
							]}
						/>
					</div>
					<div className='page__ingridients'>
						{isLoading 
						? 
						<Loading></Loading>
						:
						filtered.map(ingredient => (
							<IngredientCard
								key={ingredient.item1.id}
								title={ingredient.item1.title}
								image={ingredient.item1.icon}
								category={ingredient.item1.categoryId}
								quantity={ingredient.item2.weight}
							/>
						))
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default Ingredients