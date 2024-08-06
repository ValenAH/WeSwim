FROM openjdk:17

#Create a new directory for my application files
RUN mkdir /app

#Copy the app files from host machine to image filesystem
COPY src/main/java/com/backmaqua/BackMaquaApplication.java /app

#Set the directory for executing future commands
WORKDIR /app

#Run the application
CMD java BackMaquaApplication.java

