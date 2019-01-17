#!/usr/bin/env bash

for run in {1..50}
do
  echo -n "{\"date\":\"`date`\"}" | nc -4u -w0 localhost 41234
  sleep 0.7
done
