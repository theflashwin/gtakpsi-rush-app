# GT AKPsi Rush App

A React + Rust full stack application using Amazon Lambas, Amazon S3, and MongoDB.

## Deploy

This script deploys the entire application. Note, if you do not have AWS credentials it will not work. See below for further instructions if this is the case.

### Deploy Full Application

`chmod +x deploy.sh`

Then:

`./deploy.sh`

### Deploy Frontend Only

```

cd client
npm run deploy

```