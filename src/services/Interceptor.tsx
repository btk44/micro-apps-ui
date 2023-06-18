export function AuthInterceptor() {
    const { fetch: originalFetch } = window
    window.fetch = async (...args) => {
        let [resource, config ] = args
        const headers = new Headers()
        headers.append('Authorization', 'Bearer to.ke.n')
        headers.append('Access-Control-Allow-Origin', '*')
        headers.append('Content-Type', 'application/json')
        headers.append('accept', 'text/plain')

        if(!config){
            config = { headers: headers }
        } else if (!config.headers) {
            config.headers = headers
        }
        // append to existing headers later

        const response = await originalFetch(resource, config)

        return response
    }
}