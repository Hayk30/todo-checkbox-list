//action creator
import request from '../todo/request';
import * as actionTypes from './actionTypes'

export function getTask() {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        request('http://localhost:3001/task')
            .then(res => {
                dispatch({ type: actionTypes.GET_TASKS_SUCCESS, tasks: res })
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
}

export function addTask(data) {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request('http://localhost:3001/task', 'POST', data)
            .then(res => {
                dispatch({ type: actionTypes.ADD_TASK_SUCCESS, task: res })
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
}

