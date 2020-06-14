# Create Cluster
gcloud container clusters create demo-cluster --zone us-west2-a

# Retrieve Credentials to take actions upon the cluster
gcloud container clusters get-credentials demo-cluster --zone us-west2-a --project family-proud-intern-demo

# Deploy Database Pods and Services
bash ./db/deploy.sh

# Deploy Server Pods and Services
bash ./server/deploy.sh

# Deploy Client Pods and Services
bash ./client/deploy.sh