FROM maven:3.6.0-jdk-11-slim

ENV PROJECT_DIR=/home/app
ENV JAR_FILENAME=customassistantapi

COPY pom.xml $PROJECT_DIR/
COPY src $PROJECT_DIR/src

RUN mvn -f $PROJECT_DIR/pom.xml -DfinalName=$JAR_FILENAME clean package

FROM openjdk:11.0-jre-slim

ENV JAR_FILENAME=customassistantapi
ENV PROJECT_DIR=/home/app
ENV DB_HOST=$DB_HOST

RUN mkdir -p $PROJECT_DIR

COPY --from=0 $PROJECT_DIR/target/$JAR_FILENAME.jar /usr/local/lib/$JAR_FILENAME.jar
RUN ls -l /usr/local/lib/
EXPOSE 8081

ENTRYPOINT ["java","-Dspring.data.mongodb.host=${DB_HOST}","-jar","/usr/local/lib/customassistantapi.jar"]