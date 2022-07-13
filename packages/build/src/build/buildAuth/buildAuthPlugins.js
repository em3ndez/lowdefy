/*
  Copyright 2020-2022 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import { type } from '@lowdefy/helpers';

function buildAuthPlugin({ counter, pluginConfig, typeClass }) {
  if (type.isArray(pluginConfig)) {
    pluginConfig.forEach((plugin) => {
      if (type.isUndefined(plugin.id)) {
        throw new Error(`Auth ${typeClass} id missing.`);
      }
      if (!type.isString(plugin.id)) {
        throw new Error(
          `Auth ${typeClass} id is not a string. Received ${JSON.stringify(plugin.id)}.`
        );
      }
      if (!type.isString(plugin.type)) {
        throw new Error(
          `Auth ${typeClass} type is not a string at ${typeClass} "${
            plugin.id
          }". Received ${JSON.stringify(plugin.type)}.`
        );
      }
      counter.increment(plugin.type);
    });
  }
}

function buildAuthPlugins({ components, context }) {
  const counters = context.typeCounters.auth;
  const authConfig = components.auth;
  buildAuthPlugin({
    counter: counters.adapters,
    pluginConfig: authConfig.adapters,
    typeClass: 'adapter',
  });
  buildAuthPlugin({
    counter: counters.callbacks,
    pluginConfig: authConfig.callbacks,
    typeClass: 'callback',
  });
  buildAuthPlugin({
    counter: counters.events,
    pluginConfig: authConfig.events,
    typeClass: 'event',
  });
  buildAuthPlugin({
    counter: counters.providers,
    pluginConfig: authConfig.providers,
    typeClass: 'provider',
  });
}

export default buildAuthPlugins;
