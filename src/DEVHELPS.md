
docker run --name infofinland_local_elastic -p 9200:9200 -p 9300:9300 53ecd52afaa0


first download Elasticsearch 7.15.0, which is the version PLATTA Openshift uses, image and build the container.

docker pull docker.elastic.co/elasticsearch/elasticsearch:7.15.0

Check that image exists: docker images

Run image: docker run --name infofinland_local_elastic -p 9200:9200 -p 9300:9300 <IMAGE ID>

Once you start the process, open your browser and enter http://127.0.0.1:9200. You should see something like the following screenshot:

See all the indexes: http://127.0.0.1:9200/_cat/indices?v

Search index: http://127.0.0.1:9200/first_finnish/_search


https://drupal-infofinland.docker.so/en/admin/config/search/elasticsearch-connector/cluster/infofinland/edit


http://192.168.1.100:9200
