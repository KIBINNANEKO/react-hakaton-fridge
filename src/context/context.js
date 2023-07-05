import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {

	const [isAuth, setIsAuth] = useState(false)
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')

	return (
    <Context.Provider
      value={{
			isAuth,
			setIsAuth,
			name,
			setName,
			lastName,
			setLastName
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);