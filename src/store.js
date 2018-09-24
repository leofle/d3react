import React from 'react'

export const store = {
  graph: {
    nodes: [],
    links: [],
  }
};

export const StoreContext = React.createContext(
  store.graph // default value
);