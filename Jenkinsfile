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
                echo 'Checking out code...'
                git url: "${GITHUB_REPO}", branch: 'master'
            }            
        }

        stage('Docker Build') {   
            steps {
                echo 'Building the Docker image...'
                container('docker') {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
                echo 'Docker build successful.'
            }    
        }
            stage('Kubernetes Deploy Frontend Dependencies') {
            steps {
                echo 'Deploying API dependencies to kubernetes cluster...'
                container('kubectl') {
                    sh 'kubectl apply -f kubernetes/web-nginx-configmap.yaml'
                } 
                echo 'Deployment successful.'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Instala las dependencias y ejecuta las pruebas
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing the Docker image to Docker Hub...'
                script {
                    docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
                        // Sube la imagen a Docker Hub
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
                echo 'Docker image pushed successfully.'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Despliega la imagen en Kubernetes
                    sh "kubectl set image deployment/webpsychology-frontend webpsychology-frontend=${DOCKER_IMAGE} --record"
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
