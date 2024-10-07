pipeline {
    agent {
    docker {
            image 'node:22-alpine'
            args '-p 3000:3000'
        }
    }

    stages {    
        stage('Checkout') {
            steps {
                // checkout 
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                // Run the tests
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                // Build the application if needed
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                // Deploy the application
                // This is a placeholder; replace it with your actual deployment command
                sh 'npm run dev'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
