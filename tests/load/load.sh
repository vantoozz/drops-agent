#!/usr/bin/env bash

for run in {1..50000}
do
  echo -n "{\"tag\": \"some_event\", \"context\": {\"aaa\": true, \"bbb\": 1.23, \"ccc\": 123, \"ddd\": \"some string\", \"eee\": {\"fff\": 123, \"ggg\": 1.23}}}" | nc -4u -w0 localhost 42345
  sleep 0.01
done
