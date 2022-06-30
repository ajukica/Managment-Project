import React from 'react'
import {returnError} from './errorActions' 
import axios from 'axios'
import {CLEAR_ERROR,ADD_STUDENT,STUDENT_CREATED,STUDENT_FAIL,UPDATE_STUDENT,DELETE_STUDENT} from "./types"

/*Create Student*/
export const createStudent = ({Ime,Prezime,Email,Courses,ClassName}) => async (dispatch) =>{
    
    const config ={
        headers: {
            "content-type": "application/json",
        }
    };

    const body = JSON.stringify({Ime,Prezime,Email,Courses,ClassName});

    await axios.post("/api/student/create",body,config)
    .then(({data}) => {
        dispatch({type:CLEAR_ERROR});
        dispatch({type:ADD_STUDENT,payload:data});
        dispatch({type:STUDENT_CREATED});
    }).
    catch(err =>{
        dispatch({type: STUDENT_FAIL});
        dispatch(returnError(err.response.data.msg,
                            err.response.data.status,
                            "STUDENT_ERROR"));
    })
};

/*Read Classes*/
export const getStudent = () => async (dispatch) => {
    axios.get("/api/student")
    .then ((res)=>{
        dispatch({type: CLEAR_ERROR});
        dispatch({type:ADD_STUDENT,payload: res.data})
    })
    .catch((error) => {
        dispatch(returnError(error.response.data.msg,error.response.status));
    })
}

/* Update Class */
export const updateStudent = ({Ime,Prezime,Email,Courses,ClassName}) => async (dispatch) => {
    const body = JSON.stringify({Ime,Prezime,Email,Courses,ClassName});

    const config ={
        headers: {
            "content-type": "application/json",
        }
    };
    
    await axios.put("/api/student/update",body,config)
    .then(() => dispatch({type:UPDATE_STUDENT}))
    .catch(err => {
        dispatch (returnError(err.response.data.msg,err.response.status,
            "UPDATE_STUDENT_ERROR"))
    })

}

/*Delete a Class */

export const deleteStudent = ({id}) => async (dispatch) => {
    
    const config ={
        headers: {
            "content-type": "application/json",
        }
    };


    await axios.delete("/api/student/delete",{
        data: {id: id},
    },
    config
    ).then(()=> dispatch({type:DELETE_STUDENT}))
    .catch(err =>  dispatch (returnError(err.response.data.msg,err.response.status,"CLASS_ERROR"))
    )
}
