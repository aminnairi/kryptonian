import * as Kryptonian from "kryptonian";

export const routes = Kryptonian.Jorel.createRoutes({
  getKryptonians: {
    request: Kryptonian.none({
      message: "Request should be null"
    }),
    response: Kryptonian.list({
      message: "Response should be an array",
      rules: [],
      schema: Kryptonian.text({
        message: "Response should be an array of strings",
        rules: []
      })
    })
  }
});