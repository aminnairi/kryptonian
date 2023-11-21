import * as React from "react";
import * as Kryptonian from "../../";
import { routes } from "@template/shared";

const client = Kryptonian.Jorel.createClient({
  endpoint: "http://localhost:8000",
  routes
});

export interface Inhabitant {
  name: string,
  createdAt: Date
}

export const App = () => {
  const [kryptonians, setKryptonians] = React.useState<Array<Inhabitant>>([]);

  React.useEffect(() => {
    client.getKryptonians().then(response => {
      if (response.success) {
        console.log(response.message)
      } else {
        response.error
      }
    }).catch(error => {
      console.error(error);
    })
  }, []);

  return (
    <ul>
      {kryptonians.map(kryptonian => (
        <li key={kryptonian.name}>
          {kryptonian.name} - {kryptonian.createdAt.toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}