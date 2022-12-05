#!/bin/bash

sudo apt update -y ; sudo apt upgrade -y 
sudo apt install apache2 -y
sudo apt install nodejs -y
sudo apt install npm -y
sudo apt install wget -y

wget -c https://dev.mysql.com/get/mysql-apt-config_0.8.24-1_all.deb

dpkg -i mysql-apt-config_0.8.24-1_all.deb
sudo apt update -y ; sudo apt upgrade -y

sudo apt install mysql-server -y
sudo apt update -y ; sudo apt upgrade -y

mysql -h"localhost" -u"root" -p"fatecsjc" -e "create database embraer;"

touch /etc/systemd/system/serverExpress.service

echo "[Unit]
Description="express"
After=network.target
StartLimitIntervalSec=0
[Service]
Type=simple
Restart=always
RestartSec=1
User=root
ExecStart=/usr/bin/node /home/mateus/dist/server/dist/index.js
 
[Install]
WantedBy=multi-user.target
" >> /etc/systemd/system/serverExpress.service

systemctl daemon-reload

systemctl start serverExpress

systemctl enable serverExpress

cp -rf ./build /var/www/html/

cd /etc/apache2/sites-available/
echo "<Directory "/var/www/html/build">
    RewriteEngine on
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    RewriteRule ^ index.html [L]
</Directory>" >> 000-default.conf

sudo a2enmod rewrite

sudo service apache2 restart