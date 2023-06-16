#!/user/bin/bash

echo -e "
======================
WIBU DEV SERVER
----------------------
v0.1
======================
"

options=("menu1" "menu1" "exit")

select opt in "${options[@]}"; do
    case $opt in
    "menu1")
        echo "ini menu 1"
        ;;
    "menu2")
        echo "ini menu2"
        ;;
    "exit")
        break
        ;;
    *) echo "invalid option" ;;
    esac
done
