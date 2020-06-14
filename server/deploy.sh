# Build the API server image
docker build -t gcr.io/family-proud-intern-demo/api $PWD

# Push the created image to the GCR
gcloud docker -- push gcr.io/family-proud-intern-demo/api

# Create a config to hold environmental variables, specifically the URI for MongoDB
kubectl create configmap api-config --from-literal=MONGODB_URL=$1

# Create the service to expose the API endpoint
kubectl apply -f service.yaml

# Create the deployment
kubectl apply -f deployment.yaml
