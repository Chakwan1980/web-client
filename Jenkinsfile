
pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-token'
        DOCKER_REPO = 'rosaflores/webpsychology-frontend-app'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning the repository...'
                script {
                    env.GITHUB_REPO = 'https://github.com/Chakwan1980/web-client.git'
                    git url: "${GITHUB_REPO}", branch: 'main'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker image...'
                script {
                    def dockerImage = "${DOCKER_REPO}:${IMAGE_TAG}"
                    sh "docker build -t ${dockerImage} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing the Docker image to Docker Hub...'
                script {
                    def dockerImage = "${DOCKER_REPO}:${IMAGE_TAG}"
                    docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
                        sh "docker push ${dockerImage}"
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

