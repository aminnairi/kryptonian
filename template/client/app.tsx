import * as React from "react";
import * as Kryptonian from "kryptonian";
import { routes } from "@template/shared";

const client = Kryptonian.Jorel.createClient({
  endpoint: "http://localhost:8000",
  routes
});

export const App = () => {
  const [kryptonians, setKryptonians] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    client.getKryptonians(null).then(kryptonians => {
      setKryptonians(kryptonians);
    }).catch(error => {
      console.error(error);
    })
  }, []);

  return (
    <ul>
      {kryptonians.map(kryptonian => (
        <li key={kryptonian}>
          {kryptonian}
        </li>
      ))}
    </ul>
  );
}