import { useReducer, useCallback } from 'react'

const httpReducer = (oldState, action) => {
    switch(action.type){
      case ('START'):
        return {loading: true, error: null, data: null }
      case ('SUCCESS'):
        return {...oldState, loading: false, data: action.responseData}
      case ('FAILURE'):
        return {loading: false, error: action.errorMessage, data: action.responseData}
      case ('MODAL_CLOSE'):
        return {loading: false, error: null, data: null}
      default:
        throw new Error( "Don't reach here" )
    }
  }

const useHttpHook = () => {
    const [currentHttpStage, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null, data: null})

    const sendRequest = useCallback((url, method, body) => {
        dispatchHttp({type: 'START'})
        fetch(url,{
            method: method,
            body:JSON.stringify(body),
            headers: {
                "Context-Type": "application/json"
            }
        })
        .then(res => {
            dispatchHttp({type: 'SUCCESS'})
            // dispatchHttp({type: 'DELETE', id: id})
        }).catch(error => {
            dispatchHttp({type: 'FAILURE', errorMessage: "Something went wrong"})
        })
    }, [])
    return {
        loading: currentHttpStage.loading,
        error: currentHttpStage.error,
        data: currentHttpStage.data,
        sendRequest: sendRequest
    }
}


export default useHttpHook