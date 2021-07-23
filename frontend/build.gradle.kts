import com.github.gradle.node.yarn.task.YarnTask
import org.gradle.jvm.tasks.Jar

plugins {
    java
    id("com.github.node-gradle.node")
}

node {
    version.set("14.15.3")
    yarnVersion.set("1.22.10")
    download.set(true)
}

tasks.named("check") {
    dependsOn("test")
}

tasks.register<YarnTask>("bundle") {
    args.set(listOf("build"))
    dependsOn(tasks.yarn)
}

tasks.named("jar") {
    dependsOn("bundle")
    finalizedBy("webjar")
}

tasks.register<Jar>("webjar"){
    from(fileTree("dist"))
    into("/META-INF/resources/")
}
