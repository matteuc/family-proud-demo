# Build the API server image
docker build --no-cache -t gcr.io/family-proud-intern-demo/api $PWD

# Push the created image to the GCR
gcloud docker -- push gcr.io/family-proud-intern-demo/api

# Create a config to hold environmental variables, specifically the URI for MongoDB
kubectl create configmap api-config --from-literal=MONGODB_URL=mongodb://mongo-0-wrpjr/familyProud

# Create the service to expose the API endpoint
kubectl apply -f service.yaml

# Create the deployment
kubectl apply -f deployment.yaml
