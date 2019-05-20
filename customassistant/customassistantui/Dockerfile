FROM maven:3.6.0-jdk-11-slim

ENV PROJECT_DIR=/home/app
ENV JAR_FILENAME=customassistantui

COPY pom.xml package.json package-lock.json webpack.config.js $PROJECT_DIR/
COPY src $PROJECT_DIR/src

RUN mvn -f $PROJECT_DIR/pom.xml -DfinalName=$JAR_FILENAME clean package

FROM openjdk:11.0-jre-slim

ENV JAR_FILENAME=customassistantui
ENV PROJECT_DIR=/home/app
ENV API_URL=$API_URL

RUN mkdir -p $PROJECT_DIR

COPY --from=0 $PROJECT_DIR/target/$JAR_FILENAME.jar /usr/local/lib/$JAR_FILENAME.jar
RUN ls -l /usr/local/lib/
EXPOSE 8080

ENTRYPOINT ["java","-Dzuul.routes.api.url=${API_URL}","-jar","/usr/local/lib/customassistantui.jar"]