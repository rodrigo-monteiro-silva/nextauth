import { withSSRAuth } from "../../utils/withSSRAuth";
import { setupAPIClient } from "../services/api";
import decode from "jwt-decode";

export default function Metrics() {
  return (
    <>
      <h1>Metrics</h1>
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiCLient = setupAPIClient(ctx);
    const response = await apiCLient.get("/me");

    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
);
