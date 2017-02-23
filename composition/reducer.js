'use strict';
const obj = require('../shared/object');
const updatedObj = require('../shared/updatedObject');

// Default state definitions
const attributesState = obj.attributes;
const relationshipsEmployeePermissionsState = obj.relationships.employee_permissions;
const relationshipsEmployeesState = obj.relationships.employees;
const relationshipsSettingsState = obj.relationships.settings;
const relationshipsState = {
  employeePermissions: relationshipsEmployeesState,
  employees: relationshipsEmployeesState,
  settings: relationshipsSettingsState,
};
let storeState;

// Mock combineReducers
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}
    );
  }
};
// Mock React Component
const mockComponent = () => {};

// Action Creators`
const addSupportEmployeeAction = (email, firstName, lastName, phone) => {
  return {
    type: 'create',
    email,
    firstName,
    lastName,
    phone,
  };
};

const updateFromApiAction = (payload) => {
  return { type: 'updateFromApi', payload };
};

// Helper methods
const newEmployee = (email, first_name, last_name) => {
  return {
    attributes: {
      current: true,
      email,
      first_name,
      last_name,
      membership_id: Math.floor(Math.random() * 1000) + 100,
      root: true,
    },
    id: Math.floor(Math.random() * 1000) + 100,
    type: 'employees',
  };
};

// Reducers
const typeReducer = (state = obj.type, action = {}) => {
  switch(action.type) {
    case 'updateFromApi':
      return action.payload.type;
      break;
    default:
      return state;
  };
};

const idReducer = (state = obj.id, action = {}) => {
  switch(action.type) {
    case 'updateFromApi':
      return action.payload.id;
      break;
    default:
      return state;
  };
};

const attributesReducer = (state = attributesState, action = {}) => {
  switch(action.type) {
    case 'updateFromApi':
      return { ...action.payload.attributes };
      break;
    case 'create':
      return {
        ...state,
        support: [
          ...state.support,
          {
            email: action.email,
            name: `${action.firstName} ${action.lastName}`,
            phone: action.phone,
          }
        ],
      };
      break;
    default:
      return state;
  };
};

const relationshipsEmployeePermissionsReducer = (state = relationshipsEmployeePermissionsState, action = {}) => {
  switch(action.type) {
    case 'updateFromApi':
      return { ...action.payload.relationships.employee_permissions };
      break;
    default:
      return state;
  };
};

const relationshipsEmployeesReducer = (state = relationshipsEmployeesState, action = {}) => {
  switch(action.type) {
    case 'updateFromApi':
      return { ...action.payload.relationships.employees };
      break;
    case 'create':
      return {
        ...state,
        data: [ ...state.data, newEmployee(action.email, action.firstName, action.lastName) ],
      };
      break;
    default:
      return state;
  };
};

const relationshipsSettingsReducer = (state = relationshipsSettingsState, action = {}) => {
  switch(action.type) {
    case 'updateFromApi':
      return { ...action.payload.relationships.settings };
      break;
    default:
      return state;
  };
};

const relationshipsReducer = (state = {}, action = {}) => {
  return {
    employeePermissions: relationshipsEmployeePermissionsReducer(state.employee_permissions, action),
    employees: relationshipsEmployeesReducer(state.employees, action),
    settings: relationshipsSettingsReducer(state.settings, action),
  };
}

const reducer = combineReducers({
  attributes: attributesReducer,
  relationships: relationshipsReducer,
  type: typeReducer,
  id: idReducer,
});

// Mock store methods
const getState = () => storeState;
const setState = (newState) => storeState = newState;
const dispatch = action => {
  const state = getState();
  setState(reducer(state, action));
};
const store = {
  getState,
  dispatch,
};
const createStore = storeReducer => {
  setState(storeReducer())
  return store;
};

const start = () => {
  const s = createStore(reducer);
  console.log('defaultState >> ', JSON.stringify(s.getState(), null, 2));
  s.dispatch(updateFromApiAction(updatedObj));
  console.log('updatedState >> ', JSON.stringify(s.getState(), null, 2));
  s.dispatch(addSupportEmployeeAction('milo@raise.com', 'milo', 'beenatraiseforever', '5551238765'));
  console.log('state after create support employee >> ', JSON.stringify(s.getState(), null, 2));
};

start();
