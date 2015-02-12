#!/bin/bash

for value in a b c d e f g h i j k l m n o p q r s t u v w x y z
do
	#echo $value
	wget -O data/news24/$value.fetch -c "http://loadshedding.news24.com/api/suburbs?searchTerm=$value&pageNumber=1&pageSize=9000000"
done
