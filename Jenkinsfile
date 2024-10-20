pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/Chakwan1980/web-client.git'
        DOCKER_CREDENTIALS_ID = 'dockerhub-token'
        DOCKER_REPO = 'rosaflores/webpsychology-frontend-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_IMAGE = "${DOCKER_REPO}:${IMAGE_TAG}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning the repository...'
                git url: "${GITHUB_REPO}", branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker image...'
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing the Docker image to Docker Hub...'
                script {
                    docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }

        success {
            echo 'Docker image pushed successfully!'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}

