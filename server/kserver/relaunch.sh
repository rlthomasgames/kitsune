sleep 10s;

gnome-terminal -- bash -c "ls -a -l && npm run start; exec bash" > ./relaunch.txt