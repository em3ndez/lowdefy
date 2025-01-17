/*
Copyright 2020-2021 Lowdefy, Inc

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

import React from 'react';
import ReactDOM from 'react-dom';
import { Loading, loadWebpackFederatedModule, useDynamicScript } from '@lowdefy/block-tools';

function Shell({ rendererRemoteEntryUrl }) {
  const { ready, failed } = useDynamicScript({
    src: rendererRemoteEntryUrl,
  });

  if (!ready) {
    return <Loading type="Spinner" properties={{ height: '100vh' }} />;
  }

  if (failed) {
    return <h2>Failed to load dynamic script</h2>;
  }

  const Renderer = React.lazy(loadWebpackFederatedModule('lowdefy_renderer', 'Renderer'));

  return (
    <React.Suspense fallback={<Loading type="Spinner" properties={{ height: '100vh' }} />}>
      <Renderer gqlUri="/api/graphql" />
    </React.Suspense>
  );
}

const getRendererRemoteEntryUrl = async () => {
  return (await fetch(`/api/dev/rendererRemoteEntryUrl`)).json();
};

getRendererRemoteEntryUrl().then((rendererRemoteEntryUrl) => {
  ReactDOM.render(
    <Shell rendererRemoteEntryUrl={rendererRemoteEntryUrl} />,
    document.getElementById('root')
  );
});
