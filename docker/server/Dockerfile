FROM nginx:latest AS server

ENV DEBIAN_FRONTEND=noninteractive
ENV SERVER_PORT=80

### ADMIN ###
FROM server AS server-admin

COPY --from=spidermane/trunk * /trunk

RUN /trunk/bundles/shell

RUN /trunk/actions/cleanup

### LOCAL ###
FROM server-admin AS server-local

COPY --from=spidermane/trunk * /trunk

ARG TZ="UTC"
ENV TZ="$TZ"
RUN /trunk/setups/timezone

ARG LANG="en_US.UTF-8"
ENV LANG="$LANG"
RUN /trunk/setups/language

RUN /trunk/actions/cleanup
