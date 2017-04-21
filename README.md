# Box.net View API Arrow Connector

## Installation

```bash
$ appc install connector/appc.box
```

In your Arrow configuration, ensure you have the following:

```
connectors: {
	'appc.box': {
		generateModelsFromSchema: true
		apiKey: 'YOUR BOX-VIEW API KEY'
	}
}
```

## Usage

Two models will be auto-generated when you install this connector: `appc.box/sessions` and `appc.box/documents`.

### Programmatic Usage

```javascript
var model = Arrow.getModel('appc.box/documents');

// Creating a document via URL
model.create({
	url: 'https://training.appcelerator.com/assets/datasheet/tcd-certification-objectives.pdf'
}, function(err, instance) {

});

// Creating a document via file
model.create({
	file: fs.createReadStream(__dirname + '/files/file.pdf')
}, function(err, instance) {
});

// Retrieve all documents
model.findAll(function(err, data) {
});

// Retrieve document
model.findOne('DOCUMENT_ID_HERE', function(err, data) {
});

// Update a document
model.findOne('DOCUMENT_ID_HERE', function(err, instance) {
	instance.set('name', 'Test Document');

	instance.save(function(saveErr, savedRecord) {});
});

// Create a view session
var sessionModel = Arrow.getModel('appc.box/sessions');

sessionModel.create({
	doc_id: 'DOCUMENT_ID_HERE'
}, function(err, instance) {
});

// etc.
```

## Creating a model
If you are not extending off the two pre-build models (mentioned above), you'll need to provide some metadata
in your model to ensure the connector knows which endpoints to point to.  For example, if you want a custom model
to point to the documents endpoint of the Box View API:

```javascript
var Arrow = require('arrow');

var Model = Arrow.createModel('myCustomModel', {
	fields: {
		// your fields here
	},
	connector: 'appc.box',
	metadata: {
		'appc.box': {
			endpoint: 'documents'
		}
	}
});

module.exports = Model;

```

Likewise set the endpoint to "sessions", if you want it to point to that endpoint.

## Contributing 

This project is open source and licensed under the [Apache Public License (version 2)](http://www.apache.org/licenses/LICENSE-2.0).  Please consider forking this project to improve, enhance or fix issues. If you feel like the community will benefit from your fork, please open a pull request.

To protect the interests of the contributors, Appcelerator, customers and end users we require contributors to sign a Contributors License Agreement (CLA) before we pull the changes into the main repository. Our CLA is simple and straightforward - it requires that the contributions you make to any Appcelerator open source project are properly licensed and that you have the legal authority to make those changes. This helps us significantly reduce future legal risk for everyone involved. It is easy, helps everyone, takes only a few minutes, and only needs to be completed once.

[You can digitally sign the CLA](http://bit.ly/app_cla) online. Please indicate your email address in your first pull request so that we can make sure that will locate your CLA.  Once you've submitted it, you no longer need to send one for subsequent submissions.

# Legal Stuff

This software is licensed under the Apache 2 Public License. However, usage of the software to access the Appcelerator Platform is governed by the Appcelerator Enterprise Software License Agreement. Copyright (c) 2014-2017 by Appcelerator, Inc. All Rights Reserved.

Appcelerator is a registered trademark of Appcelerator, Inc. Arrow and associated marks are trademarks of Appcelerator. All other marks are intellectual property of their respective owners. Please see the LEGAL information about using our trademarks, privacy policy, terms of usage and other legal information at [http://www.appcelerator.com/legal](http://www.appcelerator.com/legal).