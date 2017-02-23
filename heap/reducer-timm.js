'use strict';
const memwatch = require('memwatch-next');
const Timm = require('timm');

const obj = require('../shared/object');

let state = Timm.clone(obj);

const getState = () => state;
const setState = (newState) => state = newState;

const mockComponent = () => {};

const createSupportEmployeeAction = (email, firstName, lastName, phone) => {
  return {
    type: 'create',
    email,
    firstName,
    lastName,
    phone,
  };
};

const createDoUndoAction = (val) => {
  return { type: 'doUndo', val }
};

const reducer = (state, action) => {
  let newState;
  switch(action.type) {
    case 'create':
      const employeeEntry = {
        attributes: {
          current: true,
          email: action.email,
          first_name: action.firstName,
          last_name: action.lastName,
          membership_id: Math.floor(Math.random() * 1000) + 100,
          root: true,
        },
        id: Math.floor(Math.random() * 1000) + 100,
        type: 'employees',
      };

      const supportEntry = {
        email: action.email,
        name: `${action.firstName} ${action.lastName}`,
        phone: action.phone,
      };

      newState = Timm.setIn(state, ['attributes', 'support'], Timm.addLast(state.attributes.support, supportEntry));
      return Timm.setIn(newState, ['relationships', 'employees', 'data'], Timm.addLast(state.relationships.employees.data, employeeEntry));
    case 'doUndo':
      const attrName = state.attributes.name;
      const offerType = state.relationships.settings.data.attributes.customer_offer_type;

      newState = Timm.setIn(state, ['attributes', 'name'], action.val);
      newState = Timm.setIn(newState, ['relationships', 'settings', 'data', 'attributes', 'customer_offer_type'], action.val);
      newState = Timm.setIn(newState, ['attributes', 'name'], attrName);
      return Timm.setIn(newState, ['relationships', 'settings', 'data', 'attributes', 'customer_offer_type'], offerType);
    default:
      return state;
  }
};

const start = () => {
  memwatch.on('stats', stats => console.log(`GC -> Stats:\n\n${JSON.stringify(stats)}`));
  // Start diff
  const diffStart = new memwatch.HeapDiff();
  // Mock: Reducer actions during application lifecycle
  const pedroAction = createSupportEmployeeAction('pedro@raise.com', 'Pedro', 'ThatDudePedro', '(555) 555-5555');
  setState(reducer(getState(), pedroAction));
  const miloAction = createSupportEmployeeAction('milo@raise.com', 'Milo', 'MisterArchitect', '(555) 555-5556');
  setState(reducer(getState(), miloAction));
  const contrivance = createDoUndoAction('haha');
  setState(reducer(getState(), contrivance));

  // Mock: Passing state values to a React Component
  const gottenState = getState();
  const attributes = gottenState.attributes;
  const key = gottenState.id;
  const employees = gottenState.relationships.employees.data;
  const settings = gottenState.relationships.settings.data.attributes;

  mockComponent({ key, attributes, employees, settings });
  // End diff
  const diffEnd = diffStart.end();
  console.log(`Heap Diff:\n\n${JSON.stringify(diffEnd)}`);
  memwatch.gc();
};

start();
