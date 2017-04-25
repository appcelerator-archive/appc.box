var Arrow = require('arrow')

var Model = Arrow.Model.extend('appc.box/sessions', {
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
})

module.exports = Model
