# Retrieve file's directory path
full_path=$(realpath $0)
 
dir_path=$(dirname $full_path)

# Build the API server image
docker build --no-cache -t gcr.io/family-proud-intern-demo/web $dir_path

# Push the created image to the GCR
gcloud docker -- push gcr.io/family-proud-intern-demo/web

# Create a config to hold environmental variables, specifically the URI for MongoDB
kubectl create configmap web-config --from-literal=API_URL=http://api-service

# Create the service to expose the API endpoint
kubectl apply -f $dir_path/service.yaml

# Create the deployment
kubectl apply -f $dir_path/deployment.yaml
