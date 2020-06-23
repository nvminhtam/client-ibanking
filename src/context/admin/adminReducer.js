
import { USER_ERROR } from '../types'

export default (state, action) => {
    switch (action.type) {
        case USER_ERROR:
            return {
                state
            }
        default:
            return state
    }
}