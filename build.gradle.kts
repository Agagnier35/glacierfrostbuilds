plugins {
    id("org.springframework.boot") version "2.5.2" apply false
    id("io.spring.dependency-management") version "1.0.11.RELEASE" apply false
    kotlin("jvm") version "1.5.20" apply false
    kotlin("plugin.spring") version "1.5.20" apply false
    id("com.github.node-gradle.node") version "3.1.0" apply false
}

repositories {
    mavenCentral()
}

subprojects {
    apply(from = file("${rootProject.projectDir}/gradle/heroku/stage.gradle"))
}