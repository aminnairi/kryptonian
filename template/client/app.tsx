import * as React from "react";
import * as Kryptonian from "kryptonian";
import { routes } from "@template/shared";

const client = Kryptonian.Jorel.createClientRoutes({
  server: "http://localhost:8001",
  routes
});

export interface Inhabitant {
  name: string,
  createdAt: Date
}

type GetKryptonianResponse = Kryptonian.Kalel.InferType<typeof routes.getKryptonians.response>;

export const App = () => {
  const [getKryptoniansResponse, setGetKryptoniansResponse] = React.useState<GetKryptonianResponse | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    client.getKryptonians({
      parameters: null,
      options: {}
    }).then(response => {
      if (response.success) {
        setGetKryptoniansResponse(response);
      } else {
        setError(response.error);
      }
    }).catch(error => {
      if (error instanceof Kryptonian.Jorel.BadRequestError) {
        return setError("Bad request, please check your form");
      } 

      if (error instanceof Kryptonian.Jorel.BadResponseError) {
        return setError("Bad response from the server, please try again later.");
      }

      setError("Unknown error, sorry for the inconvenience!");
    });
  }, []);

  if (error) {
    return (
      <p>There has been an error: ${error}</p>
    );
  }

  if (getKryptoniansResponse === null) {
    return (
      <p>Loading, please wait...</p>
    );
  }

  if (!getKryptoniansResponse.success) {
    return (
      <p>Error, please try again later</p>
    );
  }

  return (
    <ul>
      {getKryptoniansResponse.kryptonians.map(kryptonian => (
        <li key={kryptonian.name}>
          {kryptonian.name} - {kryptonian.rank} - {kryptonian.createdAt.toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
};
