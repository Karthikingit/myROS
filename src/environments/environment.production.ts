/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
    production: true,
    accountUrl: "https://portal.restaurantonesolution.com/", //navigated to this url when user presses 'Login to Admin'
    logLevel: NgxLoggerLevel.LOG,
    serverLogLevel: NgxLoggerLevel.ERROR,
    mockapiBaseurl: "http://localhost:3000/",
    backendUrl: "https://accounting-service.prod.restaurantonesolution.com/",
    administrationUrl:
        "https://administrationservice.prod.restaurantonesolution.com/admin/",
    azure_redirect_uri: "https://admin.restaurantonesolution.com/redirecting",
    azure_logout_uri: "https://admin.restaurantonesolution.com/login",
    adminURL:
        "https://administrationservice.prod.restaurantonesolution.com/admin/",
    hrBackendUrl: "https://hrservice.prod.restaurantonesolution.com/hr/",

};
