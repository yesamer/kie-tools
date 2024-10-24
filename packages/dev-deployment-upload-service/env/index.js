/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const { varsWithName, composeEnv, getOrDefault } = require("@kie-tools-scripts/build-env");

const buildEnv = require("@kie-tools/root-env/env");

module.exports = composeEnv([buildEnv], {
  vars: varsWithName({
    DEV_DEPLOYMENT_UPLOAD_SERVICE__downloadPath: {
      default: `apache/incubator-kie-tools/releases/download/${buildEnv.env.root.version}`,
      description: "Download path for the Dev Deployment Upload Service binary package.",
    },
    DEV_DEPLOYMENT_UPLOAD_SERVICE__downloadHost: {
      default: `https://github.com`,
      description: "Download host for the Dev Deployment Upload Service binary package.",
    },
  }),
  get env() {
    return {
      devDeploymentUploadService: {
        url: {
          path: getOrDefault(this.vars.DEV_DEPLOYMENT_UPLOAD_SERVICE__downloadPath),
          host: getOrDefault(this.vars.DEV_DEPLOYMENT_UPLOAD_SERVICE__downloadHost),
        },
      },
    };
  },
});
