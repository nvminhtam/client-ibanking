
import React, { useReducer } from 'react'
import axios from 'axios';
import AdminContext from './adminContext'
import adminReducer from './adminReducer'
import setAuthToken from '../../utils/setAuthToken'
import {


} from '../types'

const AdminState = props => {
    const initialState = {
        loading: null,
        error: null,
        success: null,
        token: localStorage.getItem('token')
    }

    const [state, dispatch] = useReducer(adminReducer, initialState)




    return (
        <AdminContext.Provider
            value={{

            }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminState