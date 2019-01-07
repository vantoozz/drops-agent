#!/usr/bin/env bash

for run in {1..10git0}
do
  echo -n `date` | nc -4u -w0 localhost 41234
done
