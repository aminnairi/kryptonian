import * as React from "react";
import * as Kryptonian from "kryptonian";
import { routes } from "@template/shared";

const client = Kryptonian.Jorel.createClient({
  server: "http://localhost:8000",
  routes
});

export interface Inhabitant {
  name: string,
  createdAt: Date
}

export const App = () => {
  const [kryptonians, setKryptonians] = React.useState<Array<Inhabitant>>([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    client.getKryptonians({
      parameters: null,
      options: {}
    }).then(response => {
      if (response.success) {
        setKryptonians(response.kryptonians);
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

  return (
    <ul>
      {kryptonians.map(kryptonian => (
        <li key={kryptonian.name}>
          {kryptonian.name} - {kryptonian.createdAt.toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
};