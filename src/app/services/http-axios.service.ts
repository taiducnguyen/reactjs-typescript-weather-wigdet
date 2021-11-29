import { IErrorResponse } from 'app/models'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
const isHandlerEnabled = true

const requestHandler = (request: AxiosRequestConfig) => {
  if (isHandlerEnabled && request) {
    // TODO: handle request header
  }
  return request
}

const successHandler = (response: AxiosRequestConfig) => {
  return response
}

/* eslint-disable prefer-promise-reject-errors */
const errorHandler = (error: any): Promise<IErrorResponse> => {
  return Promise.reject({ ...error.toJSON() as IErrorResponse })
}

export default class HttpClient {
  private axios: AxiosInstance;
  constructor (baseUrl: string) {
    this.axios = axios.create({
      baseURL: baseUrl,
      responseType: 'json'
    })

    // Enable request interceptor
    this.axios.interceptors.request.use(
      request => requestHandler(request),
      error => errorHandler(error))

    // Response and Error handler
    this.axios.interceptors.response.use(
      response => successHandler(response),
      error => errorHandler(error))
  }

  /**
   * Get Http Request
   * @param {any} url
   */
  get (url: string) {
    return new Promise((resolve, reject) => {
      this.axios.request({
        url,
        method: 'GET'
      }).then(response => {
        if (response.data) {
          resolve(response.data)
        } else {
          reject(response)
        }
      }).catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          console.error('REST request error!', error.response.data.error)
          reject(error.response.data.error)
        } else { reject(error) }
      })
    })
  }

  /**
   * Post Http Request
   * @param {any} url
   * @param {any} parrams
   */
  post (url: string, parrams: any) {
    return new Promise((resolve, reject) => {
      this.axios.request({
        url,
        method: 'POST',
        data: parrams
      }).then(response => {
        if (response.data) {
          resolve(response.data)
        } else {
          reject(response)
        }
      }).catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          console.error('REST request error!', error.response.data.error)
          reject(error.response.data.error)
        } else { reject(error) }
      })
    })
  }

  /**
   * Put Http Request
   * @param {any} url
   * @param {any} parrams
   */
  put (url: string, parrams: any) {
    return new Promise((resolve, reject) => {
      this.axios.request({
        url,
        method: 'PUT',
        data: parrams
      }).then(response => {
        if (response.data) {
          resolve(response.data)
        } else {
          reject(response)
        }
      }).catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          console.error('REST request error!', error.response.data.error)
          reject(error.response.data.error)
        } else { reject(error) }
      })
    })
  }
}
