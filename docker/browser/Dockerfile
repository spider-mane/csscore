FROM selenium/standalone-docker:latest AS browser

ENV DEBIAN_FRONTEND=noninteractive

### ADMIN ###
FROM browser AS browser-admin

COPY --from=spidermane/trunk * /trunk

RUN /trunk/bundles/shell

RUN /trunk/actions/cleanup

### LOCAL ###
FROM browser-admin AS browser-local

COPY --from=spidermane/trunk * /trunk

ARG TZ="UTC"
ENV TZ="$TZ"
RUN /trunk/setups/timezone

ARG LANG="en_US.UTF-8"
ENV LANG="$LANG"
RUN /trunk/setups/language

RUN /trunk/actions/cleanup
