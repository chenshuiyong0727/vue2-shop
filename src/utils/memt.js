//
// const ment = {
//   web: 'web',
//   app: 'app'
// }
//
// // const env = process.env.NODE_ENV === 'production' ? 'prod' : 'test'
// const env = 'web'
// // const env = 'app'
//
// export const mentSetting = {
//   ment: ment[env]
// }


const ment = {
  web: 'web',
  app: 'app'
}

// const env = process.env.NODE_ENV === 'production' ? 'prod' : 'test'
const env = 'web'

export const envSetting = {
  ment: ment[env]
}
