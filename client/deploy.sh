docker build -t gcr.io/family-proud-intern-demo/web:v$1 $PWD
gcloud docker -- push gcr.io/family-proud-intern-demo/web:v$1
kubectl create deployment web --image=gcr.io/family-proud-intern-demo/web:v$1