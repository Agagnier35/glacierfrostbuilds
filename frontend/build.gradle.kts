import com.github.gradle.node.yarn.task.YarnTask
import org.gradle.jvm.tasks.Jar

plugins {
    id("java-library")
    id("com.github.node-gradle.node")
}

node {
    version.set("14.15.3")
    yarnVersion.set("1.22.10")
    download.set(true)
}

tasks.register<YarnTask>("bundle") {
    args.set(listOf("build"))
    dependsOn(tasks.yarn)
}

tasks.register<Jar>("webjar"){
    from(fileTree("build"))
    into("/META-INF/resources/")
}

tasks.named("check") {
    dependsOn("test")
}

tasks.named("jar") {
    dependsOn("bundle")
    finalizedBy("webjar")
}
