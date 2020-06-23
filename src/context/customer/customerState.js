
import React, { useReducer } from 'react'
import uuid from 'uuid'
import CustomerContext from './customerContext'
import customerReducer from './customerReducer'
import * as customerConstant from '../types'

const CustomerState = props => {
    const initialState = {
        customers: []
    }

    // const [state, dispatch] = useRe(customerReducer, initialState)
    const [state, dispatch] = useReducer(customerReducer, initialState)
    //action


    return (
        <CustomerContext.Provider value={{
            customers: state.customers
        }}>
            {props.children}
        </CustomerContext.Provider>
    )
}

export default CustomerState