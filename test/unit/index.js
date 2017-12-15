'use strict'

const test = require('tap').test
const sinon = require('sinon')

// var box = require('box-view')
const server = require('../server')

var arrow
var connector
var documentsModel
var sessionsModel

test('### Start Arrow ###', (t) => {
  server()
    .then((inst) => {
      arrow = inst

      // Set-up
      connector = arrow.getConnector('appc.box')
      documentsModel = arrow.getModel('documents')
      sessionsModel = arrow.getModel('sessions')

      t.ok(arrow, 'Arrow has been started')
      t.end()
    })
    .catch(t.threw)
})

test('### should connect ###', (t) => {
  const sandbox = sinon.sandbox.create()

  // Stubs
  // const createClientStub = sandbox.stub(box, 'createClient').returns({})

  // Spies
  const cbSpy = sandbox.spy()

  // Function call
  connector.connect(cbSpy)

  setImmediate(function () {
    // Asserts
    // t.ok(createClientStub.calledOnce)
    t.ok(cbSpy.calledOnce)

    // Restore
    sandbox.restore()

    // End
    t.end()
  })
})

test('### should return error ###', (t) => {
  const sandbox = sinon.sandbox.create()

  // Mocks
  const endpoint = 'missingEndpoint'
  const origEndpoint = documentsModel.metadata['appc.box'].endpoint
  documentsModel.metadata['appc.box'].endpoint = endpoint

  // Spies
  const cbSpy = sandbox.spy()

  // Function call
  connector.create(documentsModel, {}, cbSpy)

  setImmediate(function () {
    // Asserts
    t.ok(cbSpy.calledOnce)
    // t.equal(cbSpy.args[0][0].message, 'Endpoint ' + endpoint + ' is not a valid endpoint for Box.  Please use a valid endpoint in the model metadata.')
    t.equal(cbSpy.args[0][0].message, 'apiKey is a required config property for the appc.box connector!')

    // Restore
    documentsModel.metadata['appc.box'].endpoint = origEndpoint
    sandbox.restore()

    // End
    t.end()
  })
})

test('### should return error ###', (t) => {
  const sandbox = sinon.sandbox.create()

  // Spies
  const cbSpy = sandbox.spy()

  // Function call
  connector.create(documentsModel, {}, cbSpy)

  setImmediate(function () {
    // Asserts
    t.ok(cbSpy.calledOnce)
    t.equal(cbSpy.args[0][0].message, 'apiKey is a required config property for the appc.box connector!')

    // Restore
    sandbox.restore()

    // End
    t.end()
  })
})

// test('### should return error ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Test Mocks
//   connector.connection.documents = {
//     uploadURL: () => { }
//   }

//   // Mocks
//   const documentsUploadURLMock = sandbox.mock(connector.connection.documents).expects('uploadURL').once().yieldsAsync(new Error('Fail'))
//   // Spies
//   const cbSpy = sandbox.spy()

//   // Function call
//   connector.create(documentsModel, { url: 'xxx' }, cbSpy)

//   setImmediate(function () {
//     // Asserts
//     documentsUploadURLMock.verify()
//     t.ok(cbSpy.calledOnce)
//     t.equal(cbSpy.args[0][0].message, 'Fail')

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

// test('### should create document ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Mocks
//   const documentsUploadURLMock = sandbox.mock(connector.connection.documents).expects('uploadURL').once().yieldsAsync(null, [{
//     id: 'xx',
//     name: 'test'
//   }])
//   // Spies
//   const cbSpy = sandbox.spy()

//   // Function call
//   connector.create(documentsModel, { url: 'xxx' }, cbSpy)

//   setImmediate(function () {
//     // Asserts
//     documentsUploadURLMock.verify()
//     t.ok(cbSpy.calledOnce)

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

// test('### should create document ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Test Mocks
//   connector.connection.documents = {
//     uploadFile: () => { }
//   }

//   // Mocks
//   const documentsUploadFileMock = sandbox.mock(connector.connection.documents).expects('uploadFile').once().yieldsAsync(null, {
//     id: 'xx',
//     name: 'test'
//   })
//   // Spies
//   const cbSpy = sandbox.spy()

//   // Function call
//   connector.create(documentsModel, { file: 'xxx' }, cbSpy)

//   setImmediate(function () {
//     // Asserts
//     documentsUploadFileMock.verify()
//     t.ok(cbSpy.calledOnce)

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

// test('### should create document ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Test Mocks
//   connector.connection.sessions = {
//     create: () => { }
//   }

//   // Mocks
//   const sessionsCreateMock = sandbox.mock(connector.connection.sessions).expects('create').once().yieldsAsync(null, [{
//     id: 'xx',
//     name: 'test'
//   }])
//   // Spies
//   const cbSpy = sandbox.spy()

//   // Function call
//   connector.create(sessionsModel, { doc_id: 'xxx' }, cbSpy)

//   setImmediate(function () {
//     // Asserts
//     sessionsCreateMock.verify()
//     t.ok(cbSpy.calledOnce)

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

test('### should return error ###', (t) => {
  const sandbox = sinon.sandbox.create()

  // Spies
  const cbSpy = sandbox.spy()

  // Function call
  connector.create(sessionsModel, {}, cbSpy)

  setImmediate(function () {
    // Asserts
    t.ok(cbSpy.calledOnce)
    t.equal(cbSpy.args[0][0].message, 'apiKey is a required config property for the appc.box connector!')

    // Restore
    sandbox.restore()

    // End
    t.end()
  })
})

test('### should return error ###', (t) => {
  const sandbox = sinon.sandbox.create()

  // Mocks
  const endpoint = 'missingEndpoint'
  const origEndpoint = documentsModel.metadata['appc.box'].endpoint
  documentsModel.metadata['appc.box'].endpoint = endpoint

  // Spies
  const cbSpy = sandbox.spy()

  // Function call
  connector.findAll(documentsModel, cbSpy)

  setImmediate(function () {
    // Asserts
    t.ok(cbSpy.calledOnce)
    t.equal(cbSpy.args[0][0].message, 'apiKey is a required config property for the appc.box connector!')

    // Restore
    documentsModel.metadata['appc.box'].endpoint = origEndpoint
    sandbox.restore()

    // End
    t.end()
  })
})

// test('### should return error ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Test Mocks
//   connector.connection.documents = {
//     list: () => { }
//   }

//   // Mocks
//   const documentsListMock = sandbox.mock(connector.connection.documents).expects('list').once().yieldsAsync(new Error('Fail'))
//   // Spies
//   const cbSpy = sandbox.spy()

//   // Function call
//   connector.findAll(documentsModel, cbSpy)

//   setImmediate(function () {
//     // Asserts
//     documentsListMock.verify()
//     t.ok(cbSpy.calledOnce)
//     t.equal(cbSpy.args[0][0].message, 'Fail')

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

// test('### should return all ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Mocks
//   const documentsListMock = sandbox.mock(connector.connection.documents).expects('list').once().yieldsAsync(null, {
//     document_collection: {
//       entries: [{
//         id: 'xx',
//         name: 'test'
//       }]
//     }
//   })
//   // Spies
//   const cbSpy = sandbox.spy()

//   // Function call
//   connector.findAll(documentsModel, cbSpy)

//   setImmediate(function () {
//     // Asserts
//     documentsListMock.verify()
//     t.ok(cbSpy.calledOnce)

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

test('### should return error ###', (t) => {
  const sandbox = sinon.sandbox.create()

  // Mocks
  const endpoint = 'missingEndpoint'
  const origEndpoint = documentsModel.metadata['appc.box'].endpoint
  documentsModel.metadata['appc.box'].endpoint = endpoint

  // Spies
  const cbSpy = sandbox.spy()

  // Function call
  connector.findOne(documentsModel, 'xxx', cbSpy)

  setImmediate(function () {
    // Asserts
    t.ok(cbSpy.calledOnce)
    t.equal(cbSpy.args[0][0].message, 'apiKey is a required config property for the appc.box connector!')

    // Restore
    documentsModel.metadata['appc.box'].endpoint = origEndpoint
    sandbox.restore()

    // End
    t.end()
  })
})

// test('### should return error ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Test Mocks
//   connector.connection.documents = {
//     get: () => { }
//   }

//   // Mocks
//   const documentsGetMock = sandbox.mock(connector.connection.documents).expects('get').once().yieldsAsync(new Error('Fail'))
//   // Spies
//   const cbSpy = sandbox.spy()

//   // Function call
//   connector.findOne(documentsModel, 'xxx', cbSpy)

//   setImmediate(function () {
//     // Asserts
//     documentsGetMock.verify()
//     t.ok(cbSpy.calledOnce)
//     t.equal(cbSpy.args[0][0].message, 'Fail')

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

// test('### should return one ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Mocks
//   const documentsGetMock = sandbox.mock(connector.connection.documents).expects('get').once().yieldsAsync(null, {
//     id: 'xx',
//     name: 'test'
//   })
//   // Spies
//   const cbSpy = sandbox.spy()

//   // Function call
//   connector.findOne(documentsModel, 'xxx', cbSpy)

//   setImmediate(function () {
//     // Asserts
//     documentsGetMock.verify()
//     t.ok(cbSpy.calledOnce)

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

test('### should return error ###', (t) => {
  const sandbox = sinon.sandbox.create()

  // Mocks
  const endpoint = 'missingEndpoint'
  const origEndpoint = documentsModel.metadata['appc.box'].endpoint
  documentsModel.metadata['appc.box'].endpoint = endpoint

  // Spies
  const cbSpy = sandbox.spy()

  // Function call
  connector.save(documentsModel, {}, cbSpy)

  setImmediate(function () {
    // Asserts
    t.ok(cbSpy.calledOnce)
    t.equal(cbSpy.args[0][0].message, 'apiKey is a required config property for the appc.box connector!')

    // Restore
    documentsModel.metadata['appc.box'].endpoint = origEndpoint
    sandbox.restore()

    // End
    t.end()
  })
})

// test('### should return error ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Test Mocks
//   connector.connection.documents = {
//     update: () => { }
//   }

//   // Mocks
//   const documentsUpdateMock = sandbox.mock(connector.connection.documents).expects('update').once().yieldsAsync(new Error('Fail'))
//   // Spies
//   const cbSpy = sandbox.spy()
//   const toPayloadSpy = sandbox.spy()
//   const getPrimaryKeySpy = sandbox.spy()

//   // Function call
//   connector.save(documentsModel, {
//     toPayload: toPayloadSpy,
//     getPrimaryKey: getPrimaryKeySpy
//   }, cbSpy)

//   setImmediate(function () {
//     // Asserts
//     documentsUpdateMock.verify()
//     t.ok(cbSpy.calledOnce)
//     t.ok(toPayloadSpy.calledOnce)
//     t.ok(getPrimaryKeySpy.calledOnce)
//     t.equal(cbSpy.args[0][0].message, 'Fail')

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

// test('### should update one ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Mocks
//   const documentsUpdateMock = sandbox.mock(connector.connection.documents).expects('update').once().yieldsAsync(null, {
//     id: 'xx',
//     name: 'test'
//   })
//   // Spies
//   const cbSpy = sandbox.spy()
//   const toPayloadSpy = sandbox.spy()
//   const getPrimaryKeySpy = sandbox.spy()

//   // Function call
//   connector.save(documentsModel, {
//     toPayload: toPayloadSpy,
//     getPrimaryKey: getPrimaryKeySpy
//   }, cbSpy)

//   setImmediate(function () {
//     // Asserts
//     documentsUpdateMock.verify()
//     t.ok(cbSpy.calledOnce)
//     t.ok(toPayloadSpy.calledOnce)
//     t.ok(getPrimaryKeySpy.calledOnce)

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

test('### should return error ###', (t) => {
  const sandbox = sinon.sandbox.create()

  // Mocks
  const endpoint = 'missingEndpoint'
  const origEndpoint = documentsModel.metadata['appc.box'].endpoint
  documentsModel.metadata['appc.box'].endpoint = endpoint

  // Spies
  const cbSpy = sandbox.spy()

  // Function call
  connector.delete(documentsModel, {}, cbSpy)

  setImmediate(function () {
    // Asserts
    t.ok(cbSpy.calledOnce)
    t.equal(cbSpy.args[0][0].message, 'apiKey is a required config property for the appc.box connector!')

    // Restore
    documentsModel.metadata['appc.box'].endpoint = origEndpoint
    sandbox.restore()

    // End
    t.end()
  })
})

// test('### should return error ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Test Mocks
//   connector.connection.documents = {
//     delete: () => { }
//   }

//   // Mocks
//   const documentsDeleteMock = sandbox.mock(connector.connection.documents).expects('delete').once().yieldsAsync(new Error('Fail'))
//   // Spies
//   const cbSpy = sandbox.spy()
//   const getPrimaryKeySpy = sandbox.spy()

//   // Function call
//   connector.delete(documentsModel, {
//     getPrimaryKey: getPrimaryKeySpy
//   }, cbSpy)

//   setImmediate(function () {
//     // Asserts
//     documentsDeleteMock.verify()
//     t.ok(cbSpy.calledOnce)
//     t.ok(getPrimaryKeySpy.calledOnce)
//     t.equal(cbSpy.args[0][0].message, 'Fail')

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

// test('### should delete one ###', (t) => {
//   const sandbox = sinon.sandbox.create()

//   // Mocks
//   const documentsDeleteMock = sandbox.mock(connector.connection.documents).expects('delete').once().yieldsAsync(null)
//   // Spies
//   const cbSpy = sandbox.spy()
//   const getPrimaryKeySpy = sandbox.spy()

//   // Function call
//   connector.delete(documentsModel, {
//     getPrimaryKey: getPrimaryKeySpy
//   }, cbSpy)

//   setImmediate(function () {
//     // Asserts
//     documentsDeleteMock.verify()
//     t.ok(cbSpy.calledOnce)
//     t.ok(getPrimaryKeySpy.calledOnce)

//     // Restore
//     sandbox.restore()

//     // End
//     t.end()
//   })
// })

test('### should disconnect ###', (t) => {
  const sandbox = sinon.sandbox.create()

  // Spies
  const cbSpy = sandbox.spy()

  // Function call
  connector.disconnect(cbSpy)

  setImmediate(function () {
    // Asserts
    t.ok(cbSpy.calledOnce)

    // Restore
    sandbox.restore()

    // End
    t.end()
  })
})

test('### Stop Arrow ###', function (t) {
  arrow.stop(() => {
    t.pass('Arrow has been stopped!')
    t.end()
  })
})
