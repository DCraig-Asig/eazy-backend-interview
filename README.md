# EazyInsure - NestJS Service Template

> The purpose of this repository is to provide a template for a NestJS service. This template is intended to be used as a starting point for new services.

### Steps to use this template
1. Clone this repository
2. Copy all of the directories and files in this repository into a new folder in the `eazy-core-backend` repository
3. Perform a project-wise search for `SERVICE_NAME` and replace all occurrences with the name of your service. Eg.: `Admin Management`
4. Perform a project-wise search for `PACKAGE_SERVICE_NAME` and replace all occurrences with the name of your service with lowercase and dash. Eg.: `admin-management`
5. Update the `.env` file with the appropriate values
6. Update the `docker/Dockerfile` exposed port with the appropriate value
7. Update the `docker-compose.yml` file from `eazy-core-backend` with the appropriate values. Example for `admin-management` service. Make sure to update the paths with the name of your service and the exposed port with the appropriate value.
```yaml
admin-management:
    container_name: admin-management
    build:
      context: ./admin-management
      dockerfile: docker/Dockerfile
      no_cache: true
      args:
        EAZY_NPM_TOKEN: ${EAZY_NPM_TOKEN}
    env_file:
      - admin-management/.env
    volumes:
      - ./admin-management:/app
      - ./admin-management/node_modules:/app/node_modules
    restart: on-failure
    networks:
      - eazyinsure
    ports:
      - 8001:8001
    depends_on:
      - kong
```
8. Update the `kong-gateway/config.yaml` from `eazy-core-backend` with the appropriate values. Example for `admin-management` service. Make sure to update the paths with the name of your service and the port with the appropriate value.
```yaml
 - name: admin-management
    url: http://admin-management:8001
    routes:
      - name: admin-management-routes
        paths:
          - /admin-management
        strip_path: false
```