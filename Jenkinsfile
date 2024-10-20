pipeline {
    agent {
        kubernetes {
            label 'jenkins-agent'
            yamlFile 'kubernetes/jenkins-pod-template.yaml' // Asegúrate de que esta ruta sea correcta
        }
    }

    triggers {
        pollSCM('H/2 * * * *')
    }
    
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
                echo "El repositorio es: ${GITHUB_REPO} probar el error"
                git url: "${GITHUB_REPO}", branch: 'master'
            }            
        }
        stage('Docker Build') {   
            steps {
                echo 'Building the Docker image...'
                container('docker') {
                    script {
                        sh "docker build -t ${DOCKER_IMAGE} ."
                    }
                }
                echo 'Docker build successful.'
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
        stage('Kubernetes Access Test') {  // Nuevo stage para verificar el acceso a Kubernetes
            steps {
                echo 'Testing access to Kubernetes cluster...'
                container('kubectl') {
                    sh 'kubectl get pods --all-namespaces' // Intenta obtener los pods en todos los namespaces
                } 
                echo 'Access to Kubernetes cluster successful.'
            }
        }
        stage('Kubernetes Deploy Frontend Dependencies') {
            steps {
                echo 'Deploying API dependencies to Kubernetes cluster...'
                container('kubectl') {
                    sh 'kubectl apply -f kubernetes/web-nginx-configmap.yaml'
                } 
                echo 'Deployment successful.'
            }
        }
        stage('Kubernetes Deploy Frontend App') {
            steps {
                echo 'Deleting previous App deployment...'
                container('kubectl') {
                    sh 'kubectl delete deployment feedback-app-frontend || true'
                } 
                echo 'Previous App deployment deleted successfully.'
                echo 'Creating new App deployment...'
                container('kubectl') {
                    script {
                        sh "sed -i 's|image: ${DOCKER_REPO}:latest|image: ${DOCKER_IMAGE}|g' kubernetes/web-frontend.yaml"
                        sh '''
                            kubectl apply -f kubernetes/web-frontend.yaml
                            kubectl rollout status deployment feedback-app-frontend --timeout=300s
                        '''
                    }
                } 
                echo 'New App deployment created successfully.'
            }
        }
    }
    post {
        always {
            echo 'Post: DockerHub URL...'
            script {
                def dockerHubUrl = "https://hub.docker.com/r/${DOCKER_REPO}/tags?name=${IMAGE_TAG}"
                echo "DockerHub URL for the image: ${dockerHubUrl}"
                writeFile file: 'dockerhub-url.txt', text: dockerHubUrl
                archiveArtifacts artifacts: 'dockerhub-url.txt'
            }
        }

        success {
            echo 'Integration tests succeeded, tagging the image with "latest"...'
            container('docker') {
                script {
                    docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
                        sh "docker tag ${DOCKER_IMAGE} ${DOCKER_REPO}:latest"
                        sh "docker push ${DOCKER_REPO}:latest"
                    }
                }
            }
            echo 'Docker image successfully pushed with "latest" tag.'
        }
    }   
}
