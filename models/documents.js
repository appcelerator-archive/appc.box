var Arrow = require('arrow')

var Model = Arrow.Model.extend('appc.box/documents', {
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
})

module.exports = Model
