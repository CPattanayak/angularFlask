kubectl delete -f ./kubefronteddeploy.yml
kubectl delete -f ./kubebackenddeploy.yml
kubectl delete -f ./kubedbdeploy.yml
kubectl delete -f ./backend-autoscale.yaml