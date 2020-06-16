# This shell script should be run with one argument, your project's ID
# Ex. 'bash ./deploy.sh [project-name]'

# Create Cluster
gcloud container clusters create family-proud-cluster --zone us-west2-a

# Retrieve Credentials to take actions upon the cluster
gcloud container clusters get-credentials family-proud-cluster --zone us-west2-a --project $1

# Deploy Database Pods and Services
bash ./db/deploy.sh

# Deploy Server Pods and Services
bash ./server/deploy.sh $1

# Deploy Client Pods and Services
bash ./client/deploy.sh $1