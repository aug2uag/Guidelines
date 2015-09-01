#!/bin/bash
# Guidelines
# aug2uag © 2015

 if [ "$#" -eq  "0" ] then
 	{
 		curl -H "Content-Type: application/json" --data @json.json http://localhost:8080/
 		file="json.json"
		[[ -f "$file" ]] && rm -f "$file"
	} || {
	    echo "failed without argument, json file must be named \"json.json\""
	}
 else
	{
		curl -H "Content-type: application/json" -X POST -d "$1" http://localhost:8080/

	} || {
	    echo "failed with argument, please verify json at http://jsonlint.com and try again"
	}
 fi