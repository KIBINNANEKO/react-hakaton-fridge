import "../styles/css/index.css"

function RecipeCard(props){

	let title = props.title

	if(title.length > 40){
		title = title.slice(0, 40) + '..'
	}

	return(
		<div className="recipe__card">
			<div className="card__img">
				<img className="main__img" alt={props.title} src={props.src}></img>
					<div className="img__title">
						<div className="">{title}</div>
						<div className="diff">Час: {props.id*10} хв.</div>
					</div>
			</div>
		</div>
	)
}

export default RecipeCard