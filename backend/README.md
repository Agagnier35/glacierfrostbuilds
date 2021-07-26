# Backend:

> Use a Kotlin run configuration in IntelliJ for the main class `GlacierFrost2BuildsApplicationKt`

Either Kotlin or spring configuration should work. I'm using community edition so you don't require IntelliJ ultimate
edition

# Spring profile:

> Add to the VM options: `-Dspring.profiles.active=local` if using Kotlin config
> If using a spring config just add `local` to the active profile field

# Database

* When using the `local` profile, an in-memory H2 database will start, while it's great and all, you lose your data
  every restart
* When using the `local-postgres` profile, if you have postgres installed locally, you can setup your credentials in the
  application-local-postgress.yml (Please don't commit those lol)

Postgress is used in the Heroku production environment so ideally confirm you queries or whatever work on that

The api server will be available on http:localhost:8080
