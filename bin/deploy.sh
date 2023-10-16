scp target/release/duck markahost:~/duck_new
ssh markahost systemctl stop duck
ssh markahost mv duck_new duck
ssh markahost systemctl start duck
echo "done."
