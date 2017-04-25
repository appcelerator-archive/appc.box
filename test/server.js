'use strict'
const Arrow = require('arrow')

module.exports = function (options) {
  return new Promise((resolve, reject) => {
    options = options || {}
    const arrow = new Arrow({}, true)
    const connector = arrow.getConnector('appc.box')
    connector.metadata = {}

    // Create test model - documents
    arrow.addModel(Arrow.createModel('documents', {
      fields: {
        name: { type: String },
        status: { type: String },
        created_at: { type: String },
        type: { type: String },
        url: {
          type: String,
          description: 'For POST / CREATE: URL to file to upload'
        },
        file: {
          type: Object,
          description: 'For POST / CREATE: File to upload - string or stream.Readable or File or Buffer accepted'
        },
        thumbnails: {
          type: String,
          description: 'For POST / CREATE: Comma-separated list of thumbnail dimensions of the format {width}x{height} (e.g. "128×128,256×256") – width can be between 16 and 1024, height between 16 and 768'
        },
        no_svg: {
          type: Boolean,
          description: 'For POST / CREATE: Whether to also create the non-svg version of the document'
        },
        content: {
          type: Object,
          readonly: true,
          description: 'The file object returned from a content query'
        }
      },
      generated: true,
      connector: 'appc.box',
      metadata: {
        'appc.box': {
          endpoint: 'documents'
        }
      }
    }))

    // Create test model - sessions
    arrow.addModel(Arrow.createModel('sessions', {
      fields: {
        expires_at: { type: String },
        type: { type: String },
        urls: { type: Object },
        doc_id: {
          type: String,
          description: 'POST / Create only: Use the doc ID when creating a new view session.'
        }
      },
      description: 'When creating a session (POST / create), you must provide a doc_id.',
      generated: true,
      connector: 'appc.box',
      actions: ['create', 'delete'],
      metadata: {
        'appc.box': {
          endpoint: 'sessions'
        }
      }
    }))

    // Return the arrow instance
    resolve(arrow)
  })
}
