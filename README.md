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
