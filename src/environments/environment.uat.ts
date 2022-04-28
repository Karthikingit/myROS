import { NgxLoggerLevel } from "ngx-logger";

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  accountUrl: "https://app.uat.restaurantonesolution.com/", //navigated to this url when user presses 'Login to Admin'
  mockapiBaseurl: "http://localhost:3000/",
  backendUrl: "https://accounting-service.uat.restaurantonesolution.com/",
  administrationUrl: "https://administrationservice.uat.restaurantonesolution.com/admin/",
  logLevel: NgxLoggerLevel.WARN,
  serverLogLevel: NgxLoggerLevel.OFF,
  azure_redirect_uri: "https://admin.uat.restaurantonesolution.com/redirecting",
  azure_logout_uri: "https://admin.uat.restaurantonesolution.com/login",
  adminURL:
    "https://administrationservice.uat.restaurantonesolution.com/admin/",
  hrBackendUrl: "https://hrservice.uat.restaurantonesolution.com/hr/",
};
