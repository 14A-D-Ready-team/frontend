# Ready! App Frontend

[![Angular](https://img.shields.io/badge/Angular-v14.2.8-red.svg)](https://angular.io/)
[![Ionic](https://img.shields.io/badge/Ionic-v6.3.3-blue.svg)](https://ionicframework.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v4.7.3-blue.svg)](https://www.typescriptlang.org/)
[![NGXS](https://img.shields.io/badge/NGXS-v3.7.5-green.svg)](https://www.ngxs.io/)
[![Cypress](https://img.shields.io/badge/Cypress-v10.10.0-yellow.svg)](https://www.cypress.io/)

This is the frontend for the Food Ordering App, built with Angular, Ionic, and NGXS.
This is the frontend of a food ordering application for buffets, called Ready!. This project is built with Angular, Ionic, and NGXS. For hosting, we're using AWS. For additional documentation, please refer to [Ready! documentation](https://docs.google.com/document/d/19URiLzB2myVWFhL0tKEixBiW8bG0VZVh).

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build for Mobile

Run `npm run build` to build the project for mobile. The build artifacts will be stored in the `dist/app/mobile` directory.

## Build for Web

Run `npm run build-web` to build the project for web. The build artifacts will be stored in the `dist/app/browser` directory.

## E2E Tests

Run `npm run e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).

## Environment Variables

Environment variables such as the API URL and Google Auth Client ID can be set in the `src/environments/environment.ts` or `src/environments/environment.prod.ts` files.

## Further help

For any questions or issues, please contact the project maintainers.
