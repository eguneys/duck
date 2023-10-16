scp target/release/duck markahost:~/duck/duck_tmp
scp -r public markahost:~/duck/
scp -r templates markahost:~/duck/
ssh markahost systemctl stop duck
ssh markahost mv duck/duck_tmp duck/duck
ssh markahost systemctl start duck
echo "done."
