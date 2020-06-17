# Family Proud @ GKE

#### An Overview

This is a simple full-stack application deployed on Google's Kubernetes Engine. The app is comprised of three main components:

1. Front-end server running a React application (written in TypeScript)
2. REST API server running on Node.js & Express (written in TypeScript)
3. MongoDB replica set

Each component is deployed as Docker containers into multiple identical Kubernetes Pods for high availability and fault tolerance. All three sets of pods are isolated in a Kubernetes cluster, preventing external traffic unless explicitly allowed via Kubernetes services. In this particular application, the front-end and API servers are exposed via Load Balancers provided by GKE. The MongoDB replica set is exposed to the API server at an internal Cluster IP, but closed from external traffic.  

This application was originally created for a tech. demonstration at [Family Proud](https://www.family-proud.com/), but it also serves as a simple showcase of how a multi-tier application can be quickly deployed and orchestrated on Google's Kubernetes Engine. 

#### Quick Start

You can deploy this application right away using the provided shell scripts named `deploy.sh`. There are four files of the same name, so here is a brief overview of each one:

- `/deploy.sh` = Creates the cluster in an existing Google Cloud project, and deploys all of the application components (by executing all three scripts below)
- `/client/deploy.sh` = Deploys only the front-end replica set and associated service
- `/server/deploy.sh` = Deploys only the API server replica set and associated service
- `/db/deploy.sh` = Deploys the MongoDB replica set, storage volumes, and associated service

After you have created a project on Google Cloud, run any of the above scripts like so:

```sh
bash deploy.sh [PROJECT_ID]
```

Executing the main `/deploy.sh` script may take 20 to 30 minutes, but once it is finished the following resources will be created within your project:

- `family-proud-cluster` = The main zone-specific Kubernetes cluster containing all the below resources
- `gcr.io/[PROJECT_ID]/web` = The Docker image for the front-end stored in the Google Cloud Registry
- `web` = Replica set running the front-end container
- `web-service` =  The load balancer service that exposes the front-end container to external traffic'
  - Visit the website by clicking on the listed `External IP` after the service is done creating
- `gcr.io/[PROJECT_ID]/api`= The Docker image for the API server stored in the Google Cloud Registry
- `api` = The set of identical pods running the API server container
- `api-service` = The load balancer service that exposes the API server to external traffic
  - Access the API by clicking on the listed `External IP` after the service is done creating
- `api-config` = The configuration containing environmental variables used in the API server
- `mongo` = The Stateful Set running the MongoDB replica set
- `mongo-service` = The Cluster IP service that exposes the replica set to internal traffic
- `mongo-persistent-storage-mongo-0` = The persistent storage volumes used by the MongoDB instances

Once you are done playing with this project, run the `cleanup.sh` script to delete all provisioned resources (so as to prevent incurring unnecessary charges)

