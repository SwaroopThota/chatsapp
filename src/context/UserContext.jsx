import { useMediaQuery } from '@mui/material'
import { signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
const UserContext = createContext()

const userReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case 'signInUser': {
			return { ...state, user: payload }
		}
		case 'setLoading': {
			return { ...state, loading: payload }
		}
		case 'setError': {
			console.error(error)
			return { ...state, error: payload }
		}
		case 'hideError': {
			return { ...state, error: null }
		}
		case 'signOutUser': {
			signOut(auth)
			return { ...state, user: null }
		}
		case 'toggleDarkMode': {
			return { ...state, darkMode: !state.darkMode }
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

export const UserProvider = ({ children }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const [state, dispatch] = useReducer(userReducer, {
		user: null,
		loading: true,
		error: null,
		darkMode: prefersDarkMode,
	})
	const addUserToDB = async (user) => {
		const querySnapshot = await getDoc(doc(db, 'users', user.uid))
		if (!querySnapshot.exists()) {
			await setDoc(doc(db, 'users', user.uid), user)
			await setDoc(doc(db, 'userChats', user.uid), {})
		}
	}
	const [user, loading, error] = useAuthState(auth)
	useEffect(() => {
		dispatch({ type: 'setLoading', payload: loading })
		if (loading || !user) return
		if (error) {
			dispatch({ type: 'setError', payload: error })
			return
		}
		const newUser = {
			uid: user.uid,
			name: user.displayName,
			photoURL: user.photoURL,
			email: user.email,
		}
		dispatch({
			type: 'signInUser',
			payload: newUser,
		})
		addUserToDB(newUser)
	}, [user, loading, error])
	const value = { data: state, dispatch }
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
