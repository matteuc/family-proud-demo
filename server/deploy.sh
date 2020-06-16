# This shell script should be run with one argument, your project's ID
# Ex. 'bash ./deploy.sh [project-name]'

# Retrieve file's directory path
full_path=$(realpath $0)
 
dir_path=$(dirname $full_path)

# Build the API server image
docker build --no-cache -t gcr.io/$1/api $dir_path

# Push the created image to the GCR
gcloud docker -- push gcr.io/$1/api

# Create a config to hold environmental variables, specifically the URI for MongoDB
kubectl create configmap api-config --from-literal=MONGODB_URL=mongodb://mongo-service/familyProud?replicaSet=rs0

# Create the service to expose the API endpoint
kubectl apply -f $dir_path/service.yaml

# Create the deployment
kubectl apply -f $dir_path/deployment.yaml
