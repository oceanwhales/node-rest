
     ,-----.,--.           ,--.
    '  .--./|  |     ,----.|  --.
    |  |    |  `---.| .-. ||  --'
    '  '--'\|  ;;  || '-' ||  |  
     `-----'`--'`--'`---- '`--'  
    -----------------------------


## Running the server

1) Open `server.js` and start the app by clicking on the "Run" button in the top menu.

2) Alternatively you can launch the app from the Terminal:

    $ node server.js

Once the server is running, open the project in the shape of 'https://projectname-username.c9.io/'. As you enter your name, watch the Users list (on the left) update. Once you press Enter or Send, the message is shared with all connected clients.


## Install MongoDB: on Cloud9

    mkdir data
    echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
    chmod a+x mongod
    ./mongod
# You should use the host $IP instead of localhost as your driver connection URL. For example, in Node, it is: process.env.IP