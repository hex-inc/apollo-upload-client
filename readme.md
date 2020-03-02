![Apollo upload logo](https://cdn.jsdelivr.net/gh/jaydenseric/apollo-upload-client@1.0.0/apollo-upload-logo.svg)

# apollo-upload-client

[![npm version](https://badgen.net/npm/v/apollo-upload-client)](https://npm.im/apollo-upload-client) [![CI status](https://github.com/jaydenseric/apollo-upload-client/workflows/CI/badge.svg)](https://github.com/jaydenseric/apollo-upload-client/actions)

A terminating [Apollo Link](https://apollographql.com/docs/link) for [Apollo Client](https://apollographql.com/docs/link#apollo-client) that allows [`FileList`](https://developer.mozilla.org/docs/web/api/filelist), [`File`](https://developer.mozilla.org/docs/web/api/file), [`Blob`](https://developer.mozilla.org/docs/web/api/blob) or [`ReactNativeFile`](#class-reactnativefile) instances within query or mutation variables and sends [GraphQL multipart requests](https://github.com/jaydenseric/graphql-multipart-request-spec).

## Setup

Install with [npm](https://npmjs.com):

```shell
npm install apollo-upload-client
```

[Apollo Boost](https://npm.im/apollo-boost) doesn’t allow link customization; if you are using it [migrate to a manual Apollo Client setup](https://apollographql.com/docs/react/advanced/boost-migration).

[Apollo Client](https://apollographql.com/docs/link#apollo-client) can only have 1 “terminating” [Apollo Link](https://apollographql.com/docs/link) that sends the GraphQL requests; if one such as [`apollo-link-http`](https://apollographql.com/docs/link/links/http) is already setup, remove it.

Initialize the client with a terminating link using [`createUploadLink`](#function-createuploadlink).

Also ensure the GraphQL server implements the [GraphQL multipart request spec](https://github.com/jaydenseric/graphql-multipart-request-spec) and that uploads are handled correctly in resolvers.

## Usage

Use [`FileList`](https://developer.mozilla.org/docs/web/api/filelist), [`File`](https://developer.mozilla.org/docs/web/api/file), [`Blob`](https://developer.mozilla.org/docs/web/api/blob) or [`ReactNativeFile`](#class-reactnativefile) instances anywhere within query or mutation variables to send a [GraphQL multipart request](https://github.com/jaydenseric/graphql-multipart-request-spec).

See also the [example API and client](https://github.com/jaydenseric/apollo-upload-examples).

### [`FileList`](https://developer.mozilla.org/docs/web/api/filelist)

```jsx
const { useMutation } = require("@apollo/react-hooks");
const gql = require("graphql-tag");

const MUTATION = gql`
  mutation($files: [Upload!]!) {
    uploadFiles(files: $files) {
      success
    }
  }
`;

const UploadFile = () => {
  const [mutate] = useMutation(MUTATION);
  const onChange = ({ target: { validity, files } }) =>
    validity.valid && mutate({ variables: { files } });

  return <input type="file" multiple required onChange={onChange} />;
};
```

### [`File`](https://developer.mozilla.org/docs/web/api/file)

```jsx
const { useMutation } = require("@apollo/react-hooks");
const gql = require("graphql-tag");

const MUTATION = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
      success
    }
  }
`;

const UploadFile = () => {
  const [mutate] = useMutation(MUTATION);
  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }) => validity.valid && mutate({ variables: { file } });

  return <input type="file" required onChange={onChange} />;
};
```

### [`Blob`](https://developer.mozilla.org/docs/web/api/blob)

```jsx
const gql = require("graphql-tag");

// Apollo Client instance.
const client = require("./client");

const file = new Blob(["Foo."], { type: "text/plain" });

// Optional, defaults to `blob`.
file.name = "bar.txt";

client.mutate({
  mutation: gql`
    mutation($file: Upload!) {
      uploadFile(file: $file) {
        success
      }
    }
  `,
  variables: { file }
});
```

## Support

- Node.js v8.10+
- Browsers [`> 0.5%, not OperaMini all, not dead`](https://browserl.ist/?q=%3E+0.5%25%2C+not+OperaMini+all%2C+not+dead)
- React Native

Consider polyfilling:

- [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`fetch`](https://developer.mozilla.org/docs/Web/API/Fetch_API)
- [`FormData`](https://developer.mozilla.org/docs/Web/API/FormData)

## API

### Table of contents
