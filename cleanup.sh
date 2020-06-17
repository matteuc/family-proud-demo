gcloud container clusters delete family-proud-cluster --async
gcloud config configurations delete api-config
gcloud container images delete api --force-delete-tags

kubectl delete persistvolumeclaim mongo-persistent-storage-mongo-0