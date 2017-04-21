#!groovy
@Library('pipeline-library') _

timestamps {
	node('git && (osx || linux)') {
		stage('Checkout') {
			checkout scm
		}

		stage('Configuration') {
			sh "echo \"module.exports = { connectors: { 'appc.box': { modelAutogen: true, generateModelsFromSchema: true, apiKey: <YOUR_API_KEY> } } };\" > conf/local.js"
		}

		buildConnector {
			// don't override anything yet
		}
	}
}
