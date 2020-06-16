# build environment
FROM node:10-alpine as react-build
ARG API_URL
WORKDIR /app
COPY . ./
RUN yarn install --network-timeout 1000000
RUN echo 'REACT_APP_API_URL=\$API_URL' > .env.production
RUN yarn build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]