import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

function RecipePage(){

	const {id} = useParams()
	const [post, setPost] = useState(null)
	let ingredient
	let i = 1

	useEffect(() => {
		fetch(`https://fridgewebappwebhunters.azurewebsites.net/get/${id}`)
		.then(res => res.json())
		.then(data => setPost(data))
	}, [id])


	return(
		<div>
		{post 
		? 
			<>
				<img className="bg__page" src={require("../assets/bg.jpg")}></img>
				<div className="container">
					<div className="recipe__page">
						<div className="page__block">
							<div>
								<h2 className="recipe__title">{post.item1.name}</h2>
								<h2 className="recipe__description">{post.item1.description}</h2>
								<h2 className="recipe__diff">Час приготування: {post.item1.difficulty*10} хв.</h2>
								<h2 className="recipe__productTitle">Склад:</h2>
								<ul>
									{post.item2.map(item => (
										<li className="recipe__description">{i++}. {item.item1.title} ({item.item2.weight} гр.)</li>
									))
									}
								</ul>
								<div className="recipe__productTitle">Інструкція: </div>
								<div className="recipe__description">{post.item1.instruction}</div>
							</div>
							<div>
								<img src={post.item1.image}></img>
							</div>
						</div>
					</div>
				</div>
			</>
		:
		null
		}
		</div>
	)
}

export default RecipePage