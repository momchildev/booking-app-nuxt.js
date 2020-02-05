import axios from 'axios'

export const API = axios.create({
  baseURL: process.env.APIbaseUrl,
  headers: {
  	'x-api-key': 'OItTmntSSR7STXFqzTJ8R7jfAXgdY8Rz1LCwVSsH'
  }
})


/*



API.interceptors.request.use(request => {
  //console.log('Starting Request', request)
  return request
})

API.interceptors.response.use(response => {
  //console.log('Response:', response)
  return response
})

*/