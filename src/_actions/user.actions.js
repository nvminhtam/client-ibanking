import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  getAccount,
  getBeneficiaryAccount,
  getBeneficiaryAccounts,
  updateListBeneficiaryInfo,
  addBeneficiary,
  transferIntrabank,
  delete: _delete,
  getDebtsList,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        history.push("/");
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      () => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      () => {
        dispatch(success(id));
      },
      (error) => {
        dispatch(failure(id, error));
      }
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}

function getAccount() {
  return (dispatch) => {
    dispatch(request());

    userService.getAccount().then(
      (accountOwner) => dispatch(success(accountOwner)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: userConstants.GET_ACCOUNOWNERTINFO_REQUEST };
  }
  function success(accountOwner) {
    return { type: userConstants.GET_ACCOUNOWNERTINFO_SUCCESS, accountOwner };
  }
  function failure(error) {
    return { type: userConstants.GET_ACCOUNOWNERTINFO_FAILURE, error };
  }
}

function getBeneficiaryAccount(accountInfor) {
  return (dispatch) => {
    dispatch(request());

    userService.getBeneficiaryAccount(accountInfor).then(
      (accountBeneficiary) => dispatch(success(accountBeneficiary)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: userConstants.GET_ACCOUNTINFO_REQUEST };
  }
  function success(accountBeneficiary) {
    return { type: userConstants.GET_ACCOUNTINFO_SUCCESS, accountBeneficiary };
  }
  function failure(error) {
    return { type: userConstants.GET_ACCOUNTINFO_FAILURE, error };
  }
}

function updateListBeneficiaryInfo(listInfo) {
  return (dispatch) => {
    dispatch(request());

    userService.updateListBeneficiaryInfo(listInfo).then(
      (successMsg) => dispatch(success(successMsg)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: userConstants.UPDATE_LISTBENEFICIARYINFO_REQUEST };
  }
  function success(successMsg) {
    return {
      type: userConstants.UPDATE_LISTBENEFICIARYINFO_SUCCESS,
      successMsg,
    };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_LISTBENEFICIARYINFO_FAILURE, error };
  }
}

function getBeneficiaryAccounts() {
  return (dispatch) => {
    dispatch(request());

    userService.getBeneficiaryAccounts().then(
      (accountBeneficiarys) => dispatch(success(accountBeneficiarys)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: userConstants.GET_LISTACCOUNTINFO_REQUEST };
  }
  function success(accountBeneficiarys) {
    return {
      type: userConstants.GET_LISTACCOUNTINFO_SUCCESS,
      accountBeneficiarys,
    };
  }
  function failure(error) {
    return { type: userConstants.GET_LISTACCOUNTINFO_FAILURE, error };
  }
}

function addBeneficiary(beneficiaryInfor) {
  return (dispatch) => {
    dispatch(request());

    userService.addBeneficiary(beneficiaryInfor).then(
      (accountBeneficiary) => dispatch(success(accountBeneficiary)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: userConstants.ADD_BENEFICIARY_REQUEST };
  }
  function success(accountBeneficiary) {
    return { type: userConstants.ADD_BENEFICIARY_SUCCESS, accountBeneficiary };
  }
  function failure(error) {
    return { type: userConstants.ADD_BENEFICIARY_FAILURE, error };
  }
}

function transferIntrabank(transferInfor) {
  return (dispatch) => {
    dispatch(request());

    userService.transferIntrabank(transferInfor).then(
      (transferInforSuccess) => dispatch(success(transferInforSuccess)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: userConstants.TRANSFER_INTRABANK_REQUEST };
  }
  function success(transferInforSuccess) {
    return {
      type: userConstants.TRANSFER_INTRABANK_SUCCESS,
      transferInforSuccess,
    };
  }
  function failure(error) {
    return { type: userConstants.TRANSFER_INTRABANK_FAILURE, error };
  }
}

function getDebtsList() {
  return (dispatch) => {
    dispatch(request());

    userService.getDebtsList().then(
      (debtList) => dispatch(success(debtList)),
      (error) => dispatch(failure(error))
    );
  };
  function request() {
    return { type: userConstants.GET_DEBTLIST_REQUEST };
  }
  function success(debtList) {
    return { type: userConstants.GET_DEBTLIST_SUCCESS, debtList };
  }
  function failure(error) {
    return { type: userConstants.GET_DEBTLIST_FAILURE, error };
  }
}
