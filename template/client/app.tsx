import * as React from "react";
import * as Kryptonian from "kryptonian";
import { routes } from "@template/shared";

const client = Kryptonian.Jorel.createClientRoutes({
  server: "http://localhost:8001",
  routes
});

export const App = () => {
  const [file, setFile] = React.useState(new File([], ""));
  const [message, setMessage] = React.useState("");

  const updateFile: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
    if (event.target.files && event.target.files[0] instanceof File) {
      setFile(event.target.files[0]);
    }
  }, []);

  const updateMessage: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
    setMessage(event.target.value);
  }, []);

  const sendKryptonianFile: React.FormEventHandler = React.useCallback(event => {
    event.preventDefault();

    Kryptonian.Jorel.Document.fromFile(file).then(document => {
      return client.sendKryptonianFile({
        parameters: {
          file: document,
          message
        },
        options: {}
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
  }, [file, message]);

  return (
    <form onSubmit={sendKryptonianFile}>
      <input type="text" value={message} onChange={updateMessage} />
      <input type="file" onChange={updateFile} />
      <button type="submit">
        Send
      </button>
    </form>
  );
};
