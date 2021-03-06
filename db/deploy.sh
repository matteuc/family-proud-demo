# Retrieve file's directory path
full_path=$(realpath $0)
 
dir_path=$(dirname $full_path)

# Retrieve Credentials to take actions upon the cluster
gcloud container clusters get-credentials family-proud-cluster --zone us-west2-a --project $1

# Create Persistent Storage for the Stateful Set
kubectl apply -f $dir_path/googlecloud_ssd.yaml

# Create the Service to expose the pod in the Stateful Set
kubectl apply -f $dir_path/mongo-service.yaml

# Create the Stateful Set
kubectl apply -f $dir_path/mongo-statefulset.yaml


