import {Link, useMatch} from 'react-router-dom'

function MyNavLink({children, to, ...props}){

	const match = useMatch(to)

	return(
		<Link
		to={to}
		style={{textDecoration: match ? 'underline #251F15' : null}}
		{...props}>
		{children}
		</Link>
	)
}

export default MyNavLink