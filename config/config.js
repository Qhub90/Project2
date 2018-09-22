if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
  } else {
    connection = mysql.createConnection({
      host: "tuy8t6uuvh43khkk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	",
      port: 3306,
      user: "g0ejpf31w9z9mcnu",
      password: "ove3rhqirqqc7uhg",
      database: "a7fc4pait6moj32a"
    });
  };