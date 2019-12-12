import ApiWrapper from 'gate-keeper'

const config = {
  baseURL: '',
  loginURL: '',
  cookieName: ''
}

const client = new ApiWrapper(config)

const api = client.apiClient
export { api }
