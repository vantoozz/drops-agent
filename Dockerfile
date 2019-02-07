FROM node:10 as typescript

RUN npm install typescript -g

FROM typescript

WORKDIR /build

COPY . /build/

RUN npm ci

RUN tsc --sourceMap false && npm uninstall -g typescript

RUN npm ci --production \
    && mkdir /app \
    && mv dist/* /app \
    && mv node_modules /app \
    && rm -rf /build

WORKDIR /app

ENTRYPOINT ["node", "drops-agent.js"]