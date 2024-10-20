pipeline {
    agent any

    environment {
        DOCKER_REPO = 'rosaflores/webpsychology-frontend-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_IMAGE = "${DOCKER_REPO}:${IMAGE_TAG}"
        DOCKER_CREDENTIALS_ID = 'dockerhub-token'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clona tu repositorio
                git 'https://github.com/Chakwan1980/web-client.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Construye la imagen Docker
                    docker.build("${DOCKER_IMAGE}", '.')
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Ejecuta pruebas de tu aplicación
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing the Docker image to Docker Hub...'
                container('docker') {
                    script {
                        docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
                            sh "docker push ${DOCKER_IMAGE}"
                        }
                    }  
                }
                echo 'Docker image pushed successfully.'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Despliega la imagen en Kubernetes
                    sh '''
                        kubectl set image deployment/webpsychology-frontend webpsychology-frontend=${DOCKER_IMAGE} --record
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completado exitosamente.'
        }
        failure {
            echo 'Pipeline fallido.'
        }
    }
}
