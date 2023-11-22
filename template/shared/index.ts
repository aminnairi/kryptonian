import * as Kryptonian from "kryptonian";

export const routes = Kryptonian.Jorel.createRoutes({
  getKryptonians: {
    request: Kryptonian.none({
      message: "Request should be void or undefined"
    }),
    response: Kryptonian.oneOf([
      Kryptonian.record({
        message: "response should be a record",
        rules: [],
        fields: {
          success: Kryptonian.literal({
            message: "success should be true",
            value: true as const
          }),
          kryptonians: Kryptonian.list({
            message: "kryptonians should be an array",
            rules: [],
            schema: Kryptonian.record({
              message: "kryptonian should be an object",
              rules: [],
              fields: {
                name: Kryptonian.text({
                  message: "Name should be a string",
                  rules: []
                }),
                createdAt: Kryptonian.date({
                  message: "createdAt should be a date",
                  rules: []
                })
              }
            })
          })
        }
      }),
      Kryptonian.record({
        message: "response should be a record",
        rules: [],
        fields: {
          success: Kryptonian.literal({
            message: "success should be false",
            value: false as const
          }),
          error: Kryptonian.text({
            message: "text should be a string",
            rules: []
          })
        }
      })
    ])
  }
});