import { useContext, useEffect } from "react";
import { Can } from "../../components/Can";

import { AuthContext } from "../../contexts/AuthContext";
import { useCan } from "../../hooks/useCan";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign Out</button>

      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiCLient = setupAPIClient(ctx);
  const response = await apiCLient.get("/me");

  console.log(response.data);

  return {
    props: {},
  };
});
