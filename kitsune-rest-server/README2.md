INSTALL MONGODB - LINUX - debian

echo "deb [ arch=amd64,arm64,i386 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt-get update

echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-database hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-mongosh hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
 
sudo apt install mongodb-org

or

sudo apt install mongodb-org@6.0

sudo systemctl start mongod

get postman and mogodb compass applications they come in usefull







GET

localhost:3090/users 

-list users only return 1 user for now, dont want to hand people a list

localhost:3090/users?{"userID":"0"}

-get user with userID

POST

create new user

localhost:3090/users?body={email:"newuser@email.com", password:"newuserpassword"}
    
