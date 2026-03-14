
cd ./client
npm i
npm run build

cd ../server

pip install -r "requirements.txt"

uvicon app.main:app --reload