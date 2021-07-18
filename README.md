glacierfrostbuilds

#Technology stack

* Kotlin JDK11
* React-Typescript
* PostgressSQL
* Heroku, TravisCI

# How-To contribute

During development:
 * Frontend:
    > Use `yarn install` then `yarn start` in the frontend directory
   The web-server will be available on http://localhost:3000
 * Backend:
   > Use a Kotlin run configuration in IntelliJ for the main class `GlacierFrost2BuildsApplicationKt`
   The api server will be available on http:localhost:8080
   
Create a jar and test full version:
   > `./gradlew clean build` you the can use `java -jar backend/build/libs/<jarname>.jar` to test exactly as what will be deployed