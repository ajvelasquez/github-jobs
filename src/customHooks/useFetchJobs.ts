import axios from "axios";
import { useEffect, useReducer } from "react";

//we added heroku URL here to avoid cors issues
const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
  UPDATE_HAS_NEXT_PAGE: "update-has-next-page",
};

const reducer = (state: any, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { isLoading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, isLoading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };
    default:
      return state;
  }
};

const useFetchJobs = (params?: any, page?: any) => {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    isLoading: [],
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const cancelToken2 = axios.CancelToken.source();

    (async () => {
      try {
        dispatch({ type: ACTIONS.MAKE_REQUEST });

        const response = await axios.get(BASE_URL, {
          cancelToken: cancelToken.token,
          params: { markdown: true, page: page, ...params },
        });

        dispatch({
          type: ACTIONS.GET_DATA,
          payload: {
            jobs: response.data,
          },
        });

        const response2 = await axios.get(BASE_URL, {
          cancelToken: cancelToken2.token,
          params: { markdown: true, page: page + 1, ...params },
        });

        dispatch({
          type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
          payload: {
            hasNextPage: response.data.length !== 0,
          },
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(error);
          return;
        }

        console.error(error);
        dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
      }

      return state;
    })();

    return () => {
      cancelToken.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
};

export default useFetchJobs;
