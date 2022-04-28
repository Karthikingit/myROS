pipeline{
    environment{
        registry= "vikaspolicedockerhub/admin-ros-frontend"
        registryCredential= "Docker-Hub-Cred"
        dockerImage= ''
    }
    
  agent any
  stages {
     stage('Build docker image'){
      steps{
        echo "Building docker image"
        script{
          dockerImage = docker.build registry + ":$BUILD_NUMBER" 
        }
      }
    }
    stage('Push docker image'){
      steps{
        echo "Pushing docker image"
        script{
           docker.withRegistry('',registryCredential) {
            dockerImage.push()
            dockerImage.push('latest')
          }
        }
      }      
    } 
  }
}
