FROM node:14 AS builder
ARG REACT_APP_APPINSIGHTS_INSTRUMENTATIONKEY
ARG REACT_APP_AUTH_AAD_AUTHORITY
ARG REACT_APP_AUTH_CLIENTID
ARG REACT_APP_AUTH_REDIRECTURL
ARG REACT_APP_AUTH_SCOPE
ARG REACT_APP_SKILL_API_URL
ARG REACT_APP_FREETRACK_API_URL
ARG REACT_APP_FREETRACK_FORM
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
RUN sed -i '/#error_page  404/ s/#error_page  404              \/404.html/error_page  404              \/index.html/' /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]