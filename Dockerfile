FROM node:10

WORKDIR /app

COPY package.json package-lock.json tsconfig.json /app/
COPY src /app/src

RUN npm install typescript -g && npm install
RUN tsc -p tsconfig.json --sourceMap false && npm uninstall -g typescript
RUN rm -rf node_modules \
    && rm -rf src \
    && npm install --production \
    && rm package.json \
    && rm package-lock.json \
    && rm tsconfig.json \
    && mv dist/* . \
    && rm -rf dist/

CMD node drops-agent.js