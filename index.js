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

const PooledResource = require('./lib/PooledResources');

const optsResA = {
    host: '192.168.0.1',
    port: 3002,
    protocol: 'http'
};

const optsResB = {
    host: '192.168.0.2',
    port: 3003,
    protocol: 'https'
};

const optsRes3 = {
    host: '192.168.0.3',
    port: 3004,
    protocol: 'http'
};

////////////////////////////////////////////////////////////////////////////////

PooledResource.createResource('ResA', optsResA);
PooledResource.createResource('ResB', optsResB);

PooledResource
.getInstance('ResA')
.getConnection()
.then((res) => {
    console.log(res);
    return PooledResource
    .getInstance('ResB')
    .getConnection();
})
.then((res) => {
    console.log(res);
    return PooledResource
    .getResource('Res3', optsRes3)
    .getConnection();
})
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log('Oops something wrong happened.', err);
});

////////////////////////////////////////////////////////////////////////////////
