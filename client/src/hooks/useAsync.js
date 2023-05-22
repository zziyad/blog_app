// import { useCallback, useEffect, useReducer } from "react";

// function asyncReducer(state, action) {
//   switch (action.type) {
//     case "LOADING":
//       return { ...state, loading: true };
//     case "SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         value: action.payload,
//         error: null,
//         status: "fulfilled",
//       };
//     case "ERROR":
//       return {
//         ...state,
//         loading: false,
//         value: null,
//         error: { status: "rejected", reason: action.payload },
//         status: "rejected",
//       };
//     default:
//       return state;
//   }
// }

// export function useAsync(fn, dependencies = []) {
//   const [state, dispatch] = useReducer(asyncReducer, {
//     loading: true,
//     value: [],
//     error: null,
//     status: "",
//   });

//   const execut = useCallback(
//     async (...param) => {
//       dispatch({ type: "LOADING" });
//       try {
//         const result = await fn(...param);
//         dispatch({ type: "SUCCESS", payload: result });
//         return result;
//       } catch (error) {
//         dispatch({ type: "ERROR", payload: error });
//         return { status: "rejected", reason: error };
//       }
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     dependencies
//   );

//   useEffect(() => {
//     execut();
//   }, [execut]);

//   return state;
// }

// export function useAsyncFn(fn, dependencies = []) {
//   return useAsyncInterna(fn, dependencies, false);
// }

// function useAsyncInterna(fn, dependencies, initialLoading = false) {
//   const [state, dispatch] = useReducer(asyncReducer, {
//     loading: initialLoading,
//     value: [],
//     error: null,
//     status: "",
//   });

//   const execut = useCallback(
//     async (...param) => {
//       dispatch({ type: "LOADING" });
//       try {
//         const result = await fn(...param);
//         dispatch({ type: "SUCCESS", payload: result });
//         return result;
//       } catch (error) {
//         dispatch({ type: "ERROR", payload: error });
//         return { status: "rejected", reason: error };
//       }
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     dependencies
//   );

//   return { ...state, execut };
// }



import { useCallback, useEffect, useState } from "react";

export function useAsync(fn, dependencies = []) {
  const { execut, ...state } = useAsyncInterna(fn, dependencies, true);

  useEffect(() => {
    execut();
  }, [execut]);

  return state;
}

export function useAsyncFn(fn, dependencies = []) {
  return useAsyncInterna(fn, dependencies, false);
}

function useAsyncInterna(fn, dependencies, initialLoading = false) {
  
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState(null);
  const [value, setValue] = useState([]);
  const [status, setStatus] = useState([]);

  const execut = useCallback((...param) => {
    setLoading(true);
    return fn(...param)
      .then((data) => {
        const { status, ...value  } = data;
        status === "fulfilled" ? setValue(value.result) : setError(value.reason);
        setStatus(status);
        return value;
      })
      .catch((error) => {
        setError({ status: "rejected", reason: error });
        setValue(null);
        return { status: "rejected", reason: error };
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { loading, error, value, status, execut };
}
