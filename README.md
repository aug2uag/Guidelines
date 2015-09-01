# Guidelines
aug2uag © 2015

## General Purpose:
* Centralize Guidelines for Clinical Practices
* Convenient Utilization of Guidelines for Applications and Interfaces
* Support Clinician Access to Guidelines
* Support Best Clinical Practices
* Support Patient Care and Rights

## Access:
S3 and/or other hosted article links provided in JSON XML and CSV formats

## Clinicians and Developers:
API access to files
* GET list of disciplines

		GET /disciplines
		curl http://localhost:9999/disciplines

* GET list of documents available

		POST /get
		BODY='{"discipline": "$DISCIPLINE_NAME"}'
		curl -H "Content-Type: application/json" -X POST -d "$BODY" http://localhost:9999/get

* GET single document
	
		POST /doc
		BODY='{"discipline": "$DISCIPLINE_NAME", "document": "$DOCUMENT_NAME"}'
		curl -H "Content-Type: application/json" -X POST -d "$BODY" http://localhost:9999/doc

## Contributors:
create json file

	{
		"type": $DISCIPLINE_NAME,
		"json": $GUIDELINES
	}

run script.js

	$ npm install
	$ node script.js

you may pass json as an argument if not saved to directory

	$ sh ./post.sh '{"optional": "json"}'

## Disciplines:
### `dental_guidelines.json` Purpose:
* Provide general guidelines for dental disciplines

### `dental_guidelines.json` Contents:
* ADA Prophylaxis Guidelines
* AHA Prophylaxis Guidelines
* Chronic Kidney Disease
* Medically Compromised Patients
* Diabetes/CKD
* Immune Compromised Patients
* Pediatric Local Anesthesia
* Local Anesthesia in Dentistry
* Immune Compromised Pediatric Patients
* Oncology Pocket Guide
* Oral Cancer Screening
* Patients with Organ Transplant
* Local Anesthesia Guidelines
* Renal Disease in Dentistry
* Wheelchair Transfer Pocket Guide

### Todo:
* Update guidelines
* Provide guidelines of other clinical practices and/or specialties
* Multiplatform scripts for pdf downloads
* Web and Mobile Applications