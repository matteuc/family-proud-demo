# Create Persistent Storage for the Stateful Set
kubectl apply -f googlecloud_ssd.yaml

# Create the Stateful Set
kubectl apply -f mongo-statefulset.yaml

# Create the Service to expose the pod in the Stateful Set
kubectl apply -f mongo-pod-service.yaml

