import * as Kryptonian from "../../";

export const routes = Kryptonian.Jorel.createRoutes({
  getKryptonians: {
    request: Kryptonian.empty({
      message: "Request should be void or undefined"
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