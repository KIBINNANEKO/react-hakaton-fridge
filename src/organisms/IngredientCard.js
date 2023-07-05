import "../styles/css/index.css"

function IngredientCard(props){

	let category = props.category

	if(category == 10) category = '🥛'
	if(category == 11) category = '🍞'
	if(category == 12) category = '🥩'
	if(category == 13) category = '🍷'
	if(category == 14) category = '🌭'
	if(category == 15) category = '🍰'
	if(category == 16) category = '🥦'
	if(category == 17) category = '🍎'
	if(category == 18) category = 'Інше'

	return(
		<div className="ingridient__card">
			<div className="card__img">
				<img className="main__img" alt={props.title} src={props.image}></img>
				<div className="img__title">{props.title}</div>
			</div>
			<div className="card__block">
				<div className="category">{props.quantity} гр.</div>
				<div className="category">Кат: {category}</div>
			</div>
		</div>
	)
}

export default IngredientCard