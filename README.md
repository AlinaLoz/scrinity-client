# Committee Dashboard Frontend

## Development

```shell script
yarn install
yarn dev # and open http://localhost:3000 in your browser 
```

## Run with SSR

```shell script
yarn build
yarn start
```

## build and deploy to registry
```
yarn publish:image
```

## docker
```
docker build -t project-z-client .
docker run --rm -i -t -p=3000:3000 --name project-z-client project-z-client
```
