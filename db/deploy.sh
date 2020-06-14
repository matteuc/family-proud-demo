# Retrieve file's directory path
full_path=$(realpath $0)
 
dir_path=$(dirname $full_path)

# Create Persistent Storage for the Stateful Set
kubectl apply -f $dir_path/googlecloud_ssd.yaml

# Create the Stateful Set
kubectl apply -f $dir_path/mongo-statefulset.yaml

# Create the Service to expose the pod in the Stateful Set
kubectl apply -f $dir_path/mongo-pod-service.yaml
