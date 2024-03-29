FROM mongo

# Workdir configs directory
WORKDIR /usr/src/configs

# Copy the configs files
COPY mongo.conf .

# Expose the port
EXPOSE 27017

CMD [ "--config", "./mongo.conf"]