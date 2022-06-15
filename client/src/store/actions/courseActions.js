import React from 'react'
import {returnError} from './errorActions' 
import axios from 'axios'
import {CLEAR_ERROR,ADD_COURSES,COURSE_FAIL,COURSE_CREATED,DELETE_COURSES} from "./types"

/*Create Course*/
export const createCoure = ({name}) => async (dispatch) =>{
    
    const config ={
        headers: {
            "content-type": "application/json",
        }
    };

    const body = JSON.stringify({name});

    await axios
    .post("/api/course/create",body,config)
    .then(({data}) => {
        dispatch({type:CLEAR_ERROR});
        dispatch({type:ADD_COURSES,payload:data});
        dispatch({type:COURSE_CREATED});
    }).
    catch(err =>{
        dispatch({type: COURSE_FAIL});
        dispatch(returnError(err.response.data.msg,
                            err.response.data.status,
                            "COURSE_FAIL"));
    })
};

/*Read Courses*/
export const getCourses = () => (dispatch) => {
    axios.get("/api/course")
    .then ((res)=>{
        dispatch({type: CLEAR_ERROR});
        dispatch({type:ADD_COURSES,payload: res.data})
    })
    .catch((err) => {
        dispatch(returnError(error.response.data.msg,error.response.status));
    })
}

/* Update Courses */
export const updateCourses = ({Naziv}) => (dispatch) => {
    const body = JSON.stringify({Naziv});

    const config ={
        headers: {
            "content-type": "application/json",
        }
    };
    
    await axios.put("/api/course/update",body,config)
    .then(() => dispatch({type:UPDATE_COURSES}))
    .catch(err => {
        dispatch (returnError(err.response.data.msg,err.response.status,
            "UPDATE_COURSES_ERROR"))
    })

}

/*Delete a Courses */

export const deleteCourse = ({id}) => (dispatch) => {
    
    const config ={
        headers: {
            "content-type": "application/json",
        }
    };

    await axios.delete("/api/course/delete",{
        data: {course_id: id},
    },
    config
    ).then(()=> dispatch({type:DELETE_COURSES}))
    .catch(err =>  dispatch (returnError(err.response.data.msg,err.response.status,))
    )
}
