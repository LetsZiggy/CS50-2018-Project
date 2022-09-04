import { inject } from 'aurelia-framework'
import { HttpClient, json } from 'aurelia-fetch-client'

@inject(HttpClient)
export class HTTP {
  constructor (HttpClient) {
    HttpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          'credentials': `same-origin`,
          headers: {
            'Accept': `application/json`,
            'X-Requested-With': `Fetch`,
          },
        })
        .withBaseUrl(`http://localhost:3000`)
        .withInterceptor({
          request(request) {
            return request
          },
          response(response) {
            return response
          },
        })
    })

    this.http = HttpClient
  }

  get (action) {
    const input = action
    const init = {
      'method': `GET`,
    }

    return (
      this.http
        .fetch(input, init)
        .then(response => response.json())
        .then(data => data)
    )
  }

  post (action, data) {
    const input = action
    const init = {
      'headers': {
        'Content-Type': `application/json`,
      },
      'method': `POST`,
      'body': (data) ? json(data) : { data: null },
    }

    return (
      this.http
        .fetch(input, init)
        .then(response => response.json())
        .then(data => data)
    )
  }
}
