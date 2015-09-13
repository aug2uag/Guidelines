# Guidelines
[![git][git-badge]][git-url]
[![npm][npm-badge]][npm-url]

* [Statement of Purpose](#purpose)
* [Access](#access)
* [Contributing](#contributing)
* [Disciplines](#disciplines)
* [TODO](#todo)
* [License](#license)

<a name="purpose"></a>
## Statement of Purpose:
* Centralize Guidelines for Clinical Practices
* Convenient Utilization of Guidelines for Applications and Interfaces
* Support Clinician Access to Guidelines
* Support Best Clinical Practices
* Support Patient Care and Rights

<a name="access"></a>
## Access:
S3 and/or other hosted article links provided in JSON XML and CSV formats

<a name="contributing"></a>
## Clinicians and Developers:
API access to files
* Get list of disciplines

		GET /disciplines
		curl http://api-guidelines.rhcloud.com/disciplines

* Get list of documents available

		POST /get
		BODY='{"discipline": "$DISCIPLINE_NAME"}'
		curl -H "Content-Type: application/json" -d "$BODY" http://api-guidelines.rhcloud.com/get

* Get single document
	
		POST /doc
		BODY='{"discipline": "$DISCIPLINE_NAME", "document": "$DOCUMENT_NAME"}'
		curl -H "Content-Type: application/json" -d "$BODY" http://api-guidelines.rhcloud.com/doc

* Get single document URL
	
		POST /url
		BODY='{"discipline": "$DISCIPLINE_NAME", "document": "$DOCUMENT_NAME"}'
		curl -H "Content-Type: application/json" -d "$BODY" http://api-guidelines.rhcloud.com/url

## Contributors:
create json file

	{
		"type": "$DISCIPLINE_NAME",
		"json": "$GUIDELINES"
	}

run [script.js][script]

	$ npm install
	$ node script.js

you may pass json with [post.sh][post] as an argument if not saved to directory

	$ sh ./post.sh '{"optional": "json"}'

<a name="disciplines"></a>
## Disciplines:
### `dental_guidelines` Purpose:
* Provide general guidelines for dental disciplines

### `dental_guidelines` Contents:
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

<a name="todo"></a>
### Todo:
* Update guidelines
* Provide guidelines of other clinical practices and/or specialties
* Multiplatform scripts for pdf downloads
* Web and Mobile Applications

<a name="license"></a>
## License
aug2uag © 2015, Licensed under [MIT][].

[MIT]: ./LICENSE
[script]: ./script.js
[post]: ./post.sh

[git-badge]: https://img.shields.io/github/release/aug2uag/guidelines.svg?style=flat-square
[git-url]: https://github.com/aug2uag/guidelines/releases
[npm-badge]: https://img.shields.io/npm/v/guidelines.svg?style=flat-square
[npm-url]: https://npmjs.org/package/guidelines