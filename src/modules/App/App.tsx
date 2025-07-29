import { useEffect } from "react";
import { useSelector } from "react-redux";

import Navigations from "../../pages/Navigations";
import Loader from "../../shared/components/Loader/Loader";
import Error from "../../shared/components/Error/Error";

import { useAppDispatch } from "../../shared/hooks/hooks";
import { getCurrent } from "../../redux/auth/auth-thunks";
import { selectToken, selectAuth } from "../../redux/auth/auth-selector";

import "../../shared/styles/style.css";

function App() {
  const token = useSelector(selectToken);
  const { loading, error } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getCurrent());
    }
  }, [dispatch, token]);

  if (token && loading) {
    return <Loader loading={loading} />;
  }

  return (
    <>
      <Navigations />
      {error && <Error>{error}</Error>}
    </>
  );
}

export default App;
