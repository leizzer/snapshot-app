#staytuned

-- Started: 2024-06-03 21:44
### Shopify research
https://shopify.dev/docs/apps/build/admin
Tiene un admin donde en un iFrame muestra la view de la app al parecer
> The Shopify admin is where users configure their stores and manage their businesses. Integrating your app with the admin gives users functionality that feels familiar and can be easily found.

https://shopify.dev/docs/api
APIs and Tools: Tiene GraphQL, REST e incluso App Bridge para el Admin

https://github.com/Shopify/shopify-app-template-ruby
Shopify App Template for Ruby from Shopify

-- End: 2024-06-03 22:28

-- Start: 2024-06-05 22:26 

-- Start: 2024-06-08 19:32
- [x] Hacer que el snapshot solo pertenezca a un store en particular (authorization)
- `rdbg -An`
- `RUBY_DEBUG_OPEN=true yarn dev`

-- END: 2024-06-09 01:28

-- Start: 2024-06-09 12:05
- [x] Mostrar imagen del producto en la lista
- [x] Agregar checkbox para elegir que productos backupear
- [ ] Agregar paginacion a la lista

-- End: 2024-06-09 15:43

-- Start: 2024-06-09 18:10

-- End: 2024-06-09 20:29

-- Start: 2024-06-09 22:23
- [ ] El usuario deberia poder elegir "collections" (es un improvement sobre lo que hay, pero no necesario para un MVP)
- [ ] `Shopify::Product` cuacks like ActiveRecord. It has `#save!` . Tal vez se podia integrar `Products` interactuar mejor con `Shopify::Product`
- [ ] `Shopify::Product` se le puede agregar `#metafields`
- [ ] Deprecated Product Shopify calls
- [ ] `@shopify/app-bridge-react` out of date v3 -> v4
-- End: 2024-06-10 01:56

-- Start: 2024-06-10 22:05

-- End: 2024-06-10 23:32

-- Start: 2024-06-11 21:46
- [ ] List `select all checkbox` error `chunk-AFFCNFNJ.js?v=e1e17479:521 Warning: findDOMNode is deprecated`

https://polaris.shopify.com/patterns/common-actions/overview

-- Start: 2024-06-12 18:30

-- End: 2024-06-12 23:39
