#!/bin/bash
# Guidelines
# aug2uag © 2015

 if [ "$#" -eq  "0" ] then
 	{
 		curl -H "Content-Type: application/json" --data @json.json http://localhost:8080/
	} || {
	    echo "failed without argument"
	}
 else
	{
		curl -H "Content-type: application/json" -X POST -d "$1" http://localhost:8080/

	} || {
	    echo "failed with argument"
	}
 fi