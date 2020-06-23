
import React, { useReducer } from 'react'
import axios from 'axios';
import EmployeeContext from './employeeContext'
import employeeReducer from './employeeReducer'
import setAuthToken from '../../utils/setAuthToken'
import {


} from '../types'

const EmployeeState = props => {
    const initialState = {
        loading: null,
        error: null,
        success: null,
        token: localStorage.getItem('token')
    }

    const [state, dispatch] = useReducer(employeeReducer, initialState)




    return (
        <EmployeeContext.Provider
            value={{

            }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeState