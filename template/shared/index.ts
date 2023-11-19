import * as Kryptonian from "../../";

export const routes = Kryptonian.Jorel.createRoutes({
  getKryptonians: {
    request: Kryptonian.empty({
      message: "Request should be void or undefined"
    }),
    response: Kryptonian.list({
      message: "Response should be an array",
      rules: [],
      schema: Kryptonian.record({
        message: "Response should be a record",
        rules: [],
        fields: {
          createdAt: Kryptonian.date({
            message: "Response record should have a property createdAt that is a date",
            rules: []
          }),
          name: Kryptonian.text({
            message: "Response record should be an array of strings",
            rules: []
          })
        }
      })
    })
  }
});