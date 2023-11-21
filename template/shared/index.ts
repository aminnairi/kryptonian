import * as Kryptonian from "../../";

export const routes = Kryptonian.Jorel.createRoutes({
  getKryptonians: {
    request: Kryptonian.empty({
      message: "Request should be void or undefined"
    }),
    response: Kryptonian.oneOf([
      Kryptonian.record({
        message: "",
        rules: [],
        fields: {
          success: Kryptonian.literal({
            message: "",
            value: true as const
          }),
          message: Kryptonian.text({
            message: "",
            rules: []
          })
        }
      }),
      Kryptonian.record({
        message: "",
        rules: [],
        fields: {
          success: Kryptonian.literal({
            message: "",
            value: false as const
          }),
          error: Kryptonian.text({
            message: "",
            rules: []
          })
        }
      })
    ])
  }
});