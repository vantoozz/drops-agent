FROM node:10

WORKDIR /build

COPY . /build/

RUN rm -rf dist \
    &&  rm -rf node_modules \
    && npm install typescript -g \
    && npm install

RUN tsc -p tsconfig.json --sourceMap false && npm uninstall -g typescript

RUN rm -rf node_modules \
    && npm install --production \
    && mkdir /app \
    && mv dist/* /app \
    && mv node_modules /app \
    && rm -rf /build

WORKDIR /app

CMD node drops-agent.js