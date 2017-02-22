#!groovy
@Library('pipeline-library') _

timestamps {
	node('git && (osx || linux)') {
		stage('Checkout') {
			checkout scm
		}

		stage('Configuration') {
			sh "echo \"module.exports = { connectors: { 'appc.box': { modelAutogen: true, generateModelsFromSchema: true, apiKey: 'oc7na5n3jyakfymx0o6wq8j3xmqhx6ez' } } };\" > conf/local.js"
		}

		buildConnector {
			// don't override anything yet
		}
	}
}
