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

const _ = require('underscore');
const ResourceHandler = require('./ResourceHandler');
const PooledResourceError = require('./errors/PooledResourceError');

function checkInstance(resourceName, resourceHandlerInstances) {
  return (_.findWhere(resourceHandlerInstances, {name: resourceName}));
};

const resourceHandlerInstances = [];

module.exports.createResource = function createResource(resourceName, options = {}) {
  if (!resourceName || resourceName.length === 0) {
    throw new PooledResourceError("Missing or invalid parameter resourceName.");
  }
  if(resourceHandlerInstances.length !== 0 &&
     checkInstance(resourceName, resourceHandlerInstances)) {
    throw new PooledResourceError("Invalid parameter resourceName. There is already" +
      " another resource with the same name.");
  }
  const resourceInstance = {
    name: resourceName,
    instance: new ResourceHandler(options)
  };
  resourceHandlerInstances.push(resourceInstance);
};

module.exports.getInstance = function getInstance(resourceName) {
  if (!resourceName || resourceName.lenght === 0 ||
      (!checkInstance(resourceName, resourceHandlerInstances))) {
    throw new PooledResourceError("Parameter resourceName have to be a valid resource name.");
  }
  return (_.findWhere(resourceHandlerInstances, {name: resourceName})).instance;
};

module.exports.getResource = function getResource(resourceName, options) {
    if (!resourceName || resourceName.length === 0) {
      throw new PooledResourceError("Missing or invalid parameter resourceName.");
    }
    if (!options) {
        if ((!checkInstance(resourceName, resourceHandlerInstances))) {
          throw new PooledResourceError("Parameter resourceName have to be a valid resource name.");
        }
    } else {
        if(resourceHandlerInstances.length !== 0 &&
           checkInstance(resourceName, resourceHandlerInstances)) {
          throw new PooledResourceError("Invalid parameter resourceName. There is already" +
            " another resource with the same name.");
        }
        const resourceInstance = {
          name: resourceName,
          instance: new ResourceHandler(options)
        };
        resourceHandlerInstances.push(resourceInstance);
    }
    return (_.findWhere(resourceHandlerInstances, {name: resourceName})).instance;
}
