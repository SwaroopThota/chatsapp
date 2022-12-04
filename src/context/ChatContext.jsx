import { createContext, useContext, useReducer } from 'react'

const ChatContext = createContext()

const chatReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case 'change_chat': {
			return payload
		}
		case 'remove_chat': {
			return {
				chatId: null,
				otherUser: null,
			}
		}
		default: {
			console.error('Action type Not found')
			return state
		}
	}
}

const ChatProvider = ({ children }) => {
	const [state, dispatch] = useReducer(chatReducer, {
		chatId: null,
		otherUser: null,
	})
	const value = { data: state, dispatch }
	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

const useChatContext = () => useContext(ChatContext)

export { ChatProvider, useChatContext }
