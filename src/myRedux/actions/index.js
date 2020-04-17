export const setClear = () => {
    return (dispatch) => {
        dispatch({
            type: "clearMember"
        })
    }
}

export const Memset = (mem_set) => {
    return (dispatch) => {
        dispatch({
            type: "Memset",
            payload:mem_set
        })
    }
}


export const Update = (mem_update) => {
    return (dispatch) => {
        dispatch({
            type: "Update",
            payload:mem_update
        })
    }
}

export const setData = (first_name,summary_point,summary_coin) => {
    let callData ={
        first_name:first_name,
        summary_point:summary_point,
        summary_coin:summary_coin
    }
    return (dispatch) => {
        dispatch({
            type: "setData",
            payload:callData
        })
    }


    
}


export const addCoin = (summary_coin) => {
    return (dispatch) => {
        dispatch({
            type: "addCoin",
            payload:summary_coin
        })
    }


    
}