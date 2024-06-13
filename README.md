# Snapshot App

## Disclaimer
This app make use of the [ShopifyApp Template for Ruby](https://github.com/Shopify/shopify-app-template-ruby), in their repository you will find more information about how it work and it's features.

This README file contains portions from ShopifyApp Template Ruby's README file.

## Herited stack

The Ruby app template comes with the following out-of-the-box functionality:

- OAuth: Installing the app and granting permissions
- GraphQL Admin API: Querying or mutating Shopify admin data
- REST Admin API: Resource classes to interact with the API
- SqLite for DB
- Shopify-specific tooling:
  - AppBridge
  - Polaris
  - Webhooks
 
Visit [ShopifyApp Template for Ruby - Tech Stack](https://github.com/Shopify/shopify-app-template-ruby?tab=readme-ov-file#tech-stack) for more in depth description

## Added to the stack

These are gems and services added to the stack:

- `dotenv` for running `rails console` with Shopify variables
- `sidekiq` for as job runner engine
- `sidekiq-scheduler` for scheduling jobs

# Getting started

## Requirements

1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).
1. You must have [Ruby](https://www.ruby-lang.org/en/) installed.
1. You must have [Bundler](https://bundler.io/) installed.
1. You must have [Node.js](https://nodejs.org/) installed.
1. You must have [Redis](https://redis.io/) installed for Sidekiq.

## Local Development

1. Clone the repository `git clone git@github.com:leizzer/snapshot-app.git`
2. Go to app folder `cd snapshot-app`
3. Install packages `yarn install`
4. Go to Rails app `cd web`
5. Install gems `bundle install`
6. Run migrations `rake db:migrate`
7. Go back to root folder of the app `cd ..`
8. Run `yarn dev`
10. It should start running all the services GraphQL, Frontend and Backend. Ports may change from run to run that is why it will provide a CloudFlare URL that will be updated automatically in Shopify toml file.
11. At the bottom of the screen you should see the label `Preview URL`
12. Follow the `Preview URL` link to install the app in your Shopify's shop.
13. In other terminal from inside the `web/` folder run `sidekiq` if you want to run the jobs locally.

## Deployment

I didn't have the chance to go over it.

# Architecture

