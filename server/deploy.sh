docker build -t gcr.io/family-proud-intern-demo/api:$1 $PWD
gcloud docker -- push gcr.io/family-proud-intern-demo/api:$1

kubectl create deployment api --image=gcr.io/family-proud-intern-demo/api:$1