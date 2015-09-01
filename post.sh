#!/bin/bash
# Guidelines
# aug2uag © 2015

 if [ "$#" -eq  "0" ] then
	file=($(ls *.json))
	curl -H "Content-Type: application/json" -d @"$file" http://localhost:8080/
	rm -f "$file"
 else
	curl -H "Content-type: application/json" -X POST -d "$1" http://localhost:8080/
 fi