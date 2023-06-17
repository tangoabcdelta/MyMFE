#!/bin/bash

# add specific instructions e.g. target environment or 
# any other inputs in this command line argument
export COMMAND_LINE_ARG_1=$1

COMMAND_LINE_ARG_1=$1 docker-compose -f compose.yml up --build