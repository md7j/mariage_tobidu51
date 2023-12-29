# curl --header "authorization: authorization_token" -d '{"name":"name", "adress":"adress", "chorale":"chorale", "instrument":"instrument"}' -H "Content-Type: application/json" -X POST http://maxime17j.pythonanywhere.com/

  curl 'https://maxime17j.pythonanywhere.com/' \
  -H 'Referer;' \
  -H 'authorization: authorization_token' \
  -H 'Content-Type: application/json' \
  --data-raw '{"name":"maxime BURES","adress":"ADDRESSE REZ","chorale":"Non","instrument":"popo"}' \
  --compressed


  