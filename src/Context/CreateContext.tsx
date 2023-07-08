import {
  ChangeEvent,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

type StateType = {
  count: number;
  text: string;
};

const initState: StateType = {
  count: 42,
  text: "",
};

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_TYPE,
}
type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case REDUCER_ACTION_TYPE.NEW_TYPE:
      return { ...state, text: action.payload ?? "" };
    default:
      throw new Error();
  }
};

const useCreateContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const increment = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT }),
    []
  );
  const decrement = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT }),
    []
  );

  const onHandleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.NEW_TYPE,
        payload: e?.target?.value,
      }),
    []
  );

  return { state, increment, decrement, onHandleInputChange };
};

type UseCreateContextType = ReturnType<typeof useCreateContext>;

const ContextInitState: UseCreateContextType = {
  state: initState,
  increment: () => {},
  decrement: () => {},
  onHandleInputChange: (e: ChangeEvent<HTMLInputElement>) => {},
};

export const CreateContext =
  createContext<UseCreateContextType>(ContextInitState);

type ChildrenType = {
  children: ReactElement | ReactElement[] | undefined;
};

export const ContextProvider = ({ children }: ChildrenType) => {
  return (
    <CreateContext.Provider value={useCreateContext(initState)}>
      {children}
    </CreateContext.Provider>
  );
};

type useCounterType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};
export const useCounter = (): useCounterType => {
  const {
    state: { count },
    increment,
    decrement,
  } = useContext(CreateContext);

  return { count, increment, decrement };
};

type useTextHook = {
  text: string;
  onHandleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useText = (): useTextHook => {
  const {
    state: { text },
    onHandleInputChange,
  } = useContext(CreateContext);

  return { text, onHandleInputChange };
};
