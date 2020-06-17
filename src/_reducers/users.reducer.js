import { userConstants } from "../_constants";

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users,
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case userConstants.GET_ACCOUNOWNERTINFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GET_ACCOUNOWNERTINFO_SUCCESS: {
      return {
        ...state,
        accountOwner: action.accountOwner || {},
      };
    }
    case userConstants.GET_ACCOUNOWNERTINFO_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case userConstants.GET_ACCOUNTINFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GET_ACCOUNTINFO_SUCCESS:
      return {
        ...state,
        accountBeneficiary: action.accountBeneficiary || {},
      };
    case userConstants.GET_ACCOUNTINFO_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case userConstants.GET_LISTACCOUNTINFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GET_LISTACCOUNTINFO_SUCCESS:
      return {
        ...state,
        accountBeneficiarys: action.accountBeneficiarys || {},
      };
    case userConstants.GET_LISTACCOUNTINFO_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case userConstants.UPDATE_LISTBENEFICIARYINFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.UPDATE_LISTBENEFICIARYINFO_SUCCESS:
      return {
        ...state,
        success: action.success || {},
      };
    case userConstants.UPDATE_LISTBENEFICIARYINFO_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case userConstants.ADD_BENEFICIARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.ADD_BENEFICIARY_SUCCESS:
      return {
        ...state,
        beneficiaryAccount: action.beneficiaryAccount || {},
      };
    case userConstants.ADD_BENEFICIARY_FAILURE:
      return {
        ...state,
        addError: action.error,
      };

    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((user) => user.id !== action.id),
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
      };
    case userConstants.GET_DEBTLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GET_DEBTLIST_SUCCESS: {
      console.log(action);
      return {
        ...state,
        debtList: action.debtList || {},
      };
    }
    case userConstants.GET_DEBTLIST_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
