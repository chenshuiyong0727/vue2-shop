
const baseUrl = {
	test: 'http://192.168.1.125:28027/',
	prod: 'http://114.132.243.79:28027/'
}

// const env = process.env.NODE_ENV === 'production' ? 'prod' : 'test'
const env = 'test'

export const envSetting = {
  baseURL: baseUrl[env]
}
