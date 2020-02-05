# booking-nuxt

> My fantabulous Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).




## SETTIUNG UP S3

aws s3api create-bucket --bucket booking.silvermirror.com --region eu-east-1 --profile silvermirror
aws s3 website s3://booking.silvermirror.com/ --index-document index.html --error-document index.html --profile silvermirror
aws s3api put-bucket-versioning --bucket booking.silvermirror.com --versioning-configuration Status=Enabled --profile silvermirror
aws s3api put-bucket-policy --bucket booking.silvermirror.com  --policy file://policy.json --profile silvermirror
