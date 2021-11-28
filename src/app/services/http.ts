import 'whatwg-fetch'

export const get = (url: string) => _fetch(url, 'GET')

export const post = (url: string, data: any, abortController = null) =>
  _fetch(url, 'POST', data, abortController)
export const put = (url: string, data: any, abortController = null) =>
  _fetch(url, 'PUT', data, abortController)
export const patch = (url: string, data: any, abortController = null) =>
  _fetch(url, 'PATCH', data, abortController)
export const remove = (url: string, data: any, abortController = null) =>
  _fetch(url, 'DELETE', data, abortController)

const _fetch = (url: string, method: string, data: any = null, abortController: any = null) => {
  let options: any = {
    method,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  if (abortController) {
    options.signal = abortController.signal
  }
  if (method !== 'GET') {
    options = {
      ...options,
      body: data ? JSON.stringify(data) : null,
      headers: {
        ...options.headers,
        'content-type': 'application/json'
      }
    }

    const token = window.localStorage.getItem('requestVerificationToken')
    if (token) {
      options = {
        ...options,
        headers: {
          ...options.headers,
          RequestVerificationToken: token
        }
      }
    }
  }
  // use native browser implementation if it supports aborting
  const abortableFetch = 'signal' in new Request('') ? window.fetch : fetch
  return abortableFetch(url, options).then(_checkStatus)
}

const _checkStatus = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    // error.response = response;
    throw error
  }
}
