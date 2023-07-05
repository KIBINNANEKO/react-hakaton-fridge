import "../styles/css/index.css"

const DropDownList = ({ options, onChange }) => {


	let tabs = document.querySelectorAll('.tabs__item')
	
	return (
		<div 
		className='tabs'
		>
			{options.map(option =>
				<div 
				key={option.value} 
				className='tabs__item'
				onClick={(event) => {
					onChange(option.value)
					tabs.forEach(item=> item.classList.remove('tabs__active'))
					tabs.forEach(item => item === event.target ? item.classList.add('tabs__active') : null)
					}}>
					{option.name}
				</div>
			)}
		</div>
	);
};

export default DropDownList;
