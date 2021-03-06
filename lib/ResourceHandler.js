/*******************************************************************************
 * Copyright (c) 2016 Nicola Del Gobbo
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the license at http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY
 * IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 * See the Apache Version 2.0 License for specific language governing
 * permissions and limitations under the License.
 *
 * Contributors - initial API implementation:
 * Nicola Del Gobbo <nicoladelgobbo@gmail.com>
 ******************************************************************************/

'use strict';

module.exports = class ResourceHandler {

    constructor(opts = {host: 'localhost', port: 3001, protocol: 'http'}) {
        console.log("Build my resouce handler");
        this.host = opts.host;
        this.port = opts.port;
        this.protocol = opts.protocol;
    }

    getConnection() {
        return new Promise((resolve, reject) => {
            console.log(`Connecting to: ${this.protocol}://${this.host}:${this.port}...`);
            setTimeout(
                () => {
                    resolve(`Connected to: ${this.protocol}://${this.host}:${this.port}`);
                },
                3000);
        });
    }
};
