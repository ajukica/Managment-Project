import React from 'react'
import {returnError} from './errorActions' 
import axios from 'axios'
import {CLEAR_ERROR,ADD_CLASS,CLASS_FAIL,CLASS_CREATED,DELETE_CLASS} from "./types"

/*Create Class*/
export const createClass = ({name}) => async (dispatch) =>{
    
    const config ={
        headers: {
            "content-type": "application/json",
        }
    };

    const body = JSON.stringify({name});

    await axios.post("/api/class/create",body,config)
    .then(({data}) => {
        dispatch({type:CLEAR_ERROR});
        dispatch({type:ADD_CLASS,payload:data});
        dispatch({type:CLASS_CREATED});
    }).
    catch(err =>{
        dispatch({type: CLASS_FAIL});
        dispatch(returnError(err.response.data.msg,
                            err.response.data.status,
                            "CLASS_ERROR"));
    })
};

/*Read Classes*/
export const getClasses = () => (dispatch) => {
    axios.get("/api/class")
    .then ((res)=>{
        dispatch({type: CLEAR_ERROR});
        dispatch({type:ADD_CLASS,payload: res.data})
    })
    .catch((err) => {
        dispatch(returnError(error.response.data.msg,error.response.status));
    })
}

/* Update Class */
export const updateClass = ({Naziv}) => (dispatch) => {
    const body = JSON.stringify({Naziv});

    const config ={
        headers: {
            "content-type": "application/json",
        }
    };
    
    await axios.put("/api/class/update",body,config)
    .then(() => dispatch({type:UPDATE_CLASS}))
    .catch(err => {
        dispatch (returnError(err.response.data.msg,err.response.status,
            "UPDATE_CLASS_ERROR"))
    })

}

/*Delete a Class */

export const deleteClass = ({id}) => (dispatch) => {
    
    const config ={
        headers: {
            "content-type": "application/json",
        }
    };

    await axios.delete("/api/class/delete",{
        data: {id: id},
    },
    config
    ).then(()=> dispatch({type:DELETE_CLASS}))
    .catch(err =>  dispatch (returnError(err.response.data.msg,err.response.status,"CLASS_ERROR"))
    )
}
