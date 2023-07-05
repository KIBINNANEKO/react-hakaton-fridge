import "../styles/css/index.css"

function HomeRecipeCard(props){

	let title = props.title
	let description = props.description

	if(title.length > 40){
		title = title.slice(0, 40) + '..'
	}

	if(description.length > 50){
		description = description.slice(0, 50) + '..'
	}

	return(
		<div className="recipe__card">
			<div className="card__img">
				<img className="main__img" alt={props.title} src={props.src}></img>
					<div className="img__title">
						<div>{title}</div>
						<div className="description">{description}</div>
					</div>
			</div>
		</div>
	)
}

export default HomeRecipeCard