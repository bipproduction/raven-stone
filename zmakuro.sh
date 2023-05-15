source zmakuro.env
command="mysql -u $db_username -p$db_password -D $db_database"
user=$(echo "select * from user" | $command)
table=$(echo "$user" | column -t)
echo "$table"
