# collaborne-proxy

This is a very simple Express 4.x proxy that exposes the /api and /login endpoints of a Collaborne system running inside [minikube](https://github.com/kubernetes/minikube).

## Installation

```sh
npm install --global collaborne-proxy
```

## Usage

1. Determine the Collaborne 'app' endpoint 

   ```sh
   minikube service -n ENVIRONMENT app --url
   ```

   > Replace _ENVIRONMENT_ with the current environment.

2. Run _collaborne-proxy_

   ```sh
   collaborne-proxy APP-URL
   ```

   > Replace _APP-URL_ with the output of step 1.

