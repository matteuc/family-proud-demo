# This shell script should be run with one argument, your project's ID
# Ex. 'bash ./deploy.sh [project-name]'

# Retrieve file's directory path
full_path=$(realpath $0)
 
dir_path=$(dirname $full_path)

PORT=$(kubectl get services api-service -o json | jq -r '.spec.ports[0].port')
IP=$(kubectl get services api-service -o json | jq -r '.status.loadBalancer.ingress[0].ip')

API_URL="http://${IP}:${PORT}"

# Build the API server image
docker build --build-arg API_URL=${API_URL} --no-cache -t gcr.io/$1/web $dir_path

# Push the created image to the GCR
gcloud docker -- push gcr.io/$1/web

# Replace Dockerfile with the correct image from your project
sed -i "s/PROJECT_ID_PLACEHOLDER/$1/g" $dir_path/deployment.yaml

# Create the service to expose the API endpoint
kubectl apply -f $dir_path/service.yaml

# Create the deployment
kubectl apply -f $dir_path/deployment.yaml
