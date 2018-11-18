docker-compose -f docker-kubernetics.yml build
kubectl create -f ./kubedbdeploy.yml
kubectl create -f ./kubebackenddeploy.yml
kubectl create -f ./kubefronteddeploy.yml
start chrome "http://localhost:30001"