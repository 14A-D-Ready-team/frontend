// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  google: {
    clientId:
      "101784584402-d88n8hpcomqdhd10iolmcoh9nrco9mkl.apps.googleusercontent.com",
  },
  api: {
    url: "http://ec2-18-192-127-39.eu-central-1.compute.amazonaws.com",
  },
  /* api: {
    url: "http://localhost:3000",
  }, */
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
