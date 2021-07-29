import { useRerender } from "@/libs/hooks";

let _store = {};

const installState = ({ state, store }) => {
  Object.keys(state).forEach((key) => {
    Object.defineProperty(store, key, {
      get: () => state[key],
      set: (val) => {
        state[key] = val;
        store._rerender();
      },
    });
  });
};

export const useCreateStore = (state, module = 'root') => {
  if (!_store[module]) _store[module] = {};
  const store = getStore(module);
  store._rerender = useRerender();
  if (!store._installed) {
    installState({ state, store });
    store._installed = true;
  }
};

export const getStore = (moduleName = 'root') => _store[moduleName];