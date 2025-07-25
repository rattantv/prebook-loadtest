/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import { ModelClient } from "@adobe/aem-spa-page-model-manager";

/**
 * Custom ModelClient meant to demonstrate how to customize the request sent to the AEM instance
 */
export default class CustomModelClient extends ModelClient {

    /**
     * Fetches a model using the given a resource path
     *
     * @param {string} modelPath - Path to the model
     * @return {*}
     */
    fetch(modelPath) {

        if (!modelPath) {
            let err = 'Fetching model rejected for path: ' + modelPath;
            return Promise.reject(new Error(err));
        }

        // Either the API host has been provided or we make an absolute request relative to the current host
        let url = `${this._apiHost}${modelPath}`;
        console.log(`custom model client is called ${url}`)

        return fetch(url,  {
            headers: {
                Authorization: 'Basic YWlzdXNlcjpndnd2Z3ZsQEY9OGZ1'
            }
        }).then(function(response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                let error = new Error('while fetching the model for url: ' + url, response.statusText || response.status);
                error.response = response;

                // return Promise.reject(error);
            }
        });
    }
}
