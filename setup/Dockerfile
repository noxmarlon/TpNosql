FROM mongo:latest

# Create app directory
WORKDIR /usr/src/configs

#install app dependencies
COPY replicaSet.js .

COPY setup.sh .
# give all permissions to the setup.sh file
RUN chmod +x /usr/src/configs/setup.sh
CMD [ "./setup.sh" ]