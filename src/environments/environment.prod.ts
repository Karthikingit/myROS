import { NgxLoggerLevel } from "ngx-logger";

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  accountUrl: "https://app.test.restaurantonesolution.com/", //navigated to this url when user presses 'Login to Admin'
  mockapiBaseurl: "http://localhost:3000/",
  backendUrl: "https://accounting-service.test.restaurantonesolution.com/",
  administrationUrl: "https://administrationservice.test.restaurantonesolution.com/admin/",
  logLevel: NgxLoggerLevel.WARN,
  serverLogLevel: NgxLoggerLevel.OFF,
  azure_redirect_uri:
    "https://admin.test.restaurantonesolution.com/redirecting",
  azure_logout_uri: "https://admin.test.restaurantonesolution.com/login",
  adminURL:
    "https://administrationservice.test.restaurantonesolution.com/admin/",
  hrBackendUrl: "https://hrservice.test.restaurantonesolution.com/hr/",
};
