import "../styles/css/index.css"

function NotFoundPage(){

	return(
		<div className="NotFoundPage">
			<img className="bg__page" src={require('../assets/error.jpg')}></img>
		</div>
	)
}

export default NotFoundPage