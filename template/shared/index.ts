import * as Kryptonian from "kryptonian";

export const routes = Kryptonian.Jorel.createRoutes({
  getKryptonians: {
    request: Kryptonian.Kalel.none({
      message: "Request should be void or undefined"
    }),
    response: Kryptonian.Kalel.oneOf([
      Kryptonian.Kalel.object({
        message: "response should be an object",
        fields: {
          success: Kryptonian.Kalel.literal({
            message: "success should be true",
            value: true as const
          }),
          kryptonians: Kryptonian.Kalel.array({
            message: "kryptonians should be an array",
            rules: [],
            schema: Kryptonian.Kalel.object({
              message: "kryptonian should be an object",
              fields: {
                name: Kryptonian.Kalel.string({
                  message: "Name should be a string",
                  rules: []
                }),
                rank: Kryptonian.Kalel.string({
                  message: "Rank should be a string",
                  rules: []
                }),
                createdAt: Kryptonian.Kalel.date({
                  message: "createdAt should be a date",
                  rules: []
                })
              }
            })
          })
        }
      }),
      Kryptonian.Kalel.object({
        message: "response should be a object",
        fields: {
          success: Kryptonian.Kalel.literal({
            message: "success should be false",
            value: false as const
          }),
          error: Kryptonian.Kalel.string({
            message: "error should be a string",
            rules: []
          })
        }
      })
    ])
  },
  sendKryptonianFile: {
    request: Kryptonian.Kalel.object({
      message: "Request should be an object",
      fields: {
        file: Kryptonian.Kalel.document({
          message: "file should be a file",
        }),
        message: Kryptonian.Kalel.string({
          message: "message should be a string",
          rules: []
        })
      }
    }),
    response: Kryptonian.Kalel.none({
      message: ""
    })
  }
});
