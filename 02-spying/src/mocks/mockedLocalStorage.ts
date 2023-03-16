/**
 * A mock of localStorage
 */
const storage = new Map()

export default () => {
	return {
		getItem: (key: string) => storage.get(key),

		setItem: (key: string, value: string) => storage.set(key, value),

		length: storage.size, // this won't update, but isn't used in used in our app

		clear: () => storage.clear(),

		key: () => null, // this won't work either, but also won't be used in our app

		removeItem: (key: string) => storage.delete(key)
	}
}
