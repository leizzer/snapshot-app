# Snapshot App

## Disclaimer
This app make use of the [ShopifyApp Template for Ruby](https://github.com/Shopify/shopify-app-template-ruby), in their repository you will find more information about how it work and it's features.

This README file contains portions from ShopifyApp Template Ruby's README file.

## Inherited stack

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
12. Follow the `Preview URL` link to install the app in your Shopify's shop. (tip: pin the app in your Shopify sidebar)
13. In other terminal from inside the `web/` folder run `sidekiq` if you want to run the jobs locally.

## Deployment

I didn't have the chance to go over it.

# Architecture

## DB

[Database diagram](https://github.com/leizzer/snapshot-app/blob/main/web/erd.pdf)

## Application Overview

### Shops

I won't go deep talking about this resource since it was created by the template and it's better described in their repo, but basically it's used as part of the authentication process saving the access token.

### Products

#### In Database / Model

Product model contains some featured fields pulled from Shopify product database; and I decided to save the entire JSON object in the database to have the entire original representation saved.

#### Controller

This controller came with the template and exposes actions to easily create fake products on demand. I decided to leave it since this is not a real product and it will help try the app on Shopify.

#### Frontend

Products are only presented as part of Snapshots in the form of lists.

### Snapshot

#### In Database / Model

Snapshots is the face of the backed up products. It's a simple model that groups copies of the products. It has a flag to show if it was generated by schedule `automatic` 

#### Controller

It pretty much has the regular RESTful actions. It doesn't have edit/upgrade for reasons that I will discuss during our call.
The action to highlight is the `restore` action that receives the `id` if the snapshot and the `product_ids` that the user wants to restore, with this information if will call the `SnapshotRestorer` service. The service tries to update current product on Shopify with the information saved in snapshot-app, if it fails it's probably because the product was deleted on Shopify so it tries to creates the product instead.

#### Frontend

- Home page: List of snapshots in order of creation. There you can create a new snapshot manually.
- New Snapshot page: For manually create a new snapshot. User can change the default name for the snapshot and select which products wants to back up.
- Restore Page: When the user clicks on a snapshot the app will present a page with all the products from that snapshot and user can select which products to restore.

### Schedules

#### In Database / Model

The field to highlight here is the `recurring` field that can ben `disabled`, `daily`, `weekly` or `monthly`. This model is used to know if the user wants to automatically create snapshots and with what frequency.

A `Schedule` is created for each `Shop` after the shop is created.

#### Controller

Simple controller with for updating the `recurring` value.

#### Frontend

- Home page: List of snapshots in order of creation. There you can create a new snapshot manually.
- New Snapshot page: For manually create a new snapshot. User can change the default name for the snapshot and select which products wants to back up.
- Restore Page: When the user clicks on a snapshot the app will present a page with all the products from that snapshot and user can select which products to restore.

### Jobs

#### SnapshotQueuerJob

Is called by SidekiqScheduler, using the type that can be `daily`, `weekly` or `monthly` it queries the DB for all shops that don't have `Snapshots` created automatically during a period by type. Then it will enqueue the `SnapshotJob` for each shop.

#### SnapshotJob

Called by `SnapshotQueuerJob` it perform the copy of the products from Shopify into the DB.


# Changes over original template

I've created a PR to capture the changes from my part [https://github.com/leizzer/snapshot-app/pull/1](https://github.com/leizzer/snapshot-app/pull/1)
