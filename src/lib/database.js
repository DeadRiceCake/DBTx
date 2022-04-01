const mysql = require("mysql");

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "111111",
  database: "tx",
  connectionLimit: 10,
});


exports.query = function (query, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        //DB 쿼리 실패시 연결끊기.

        console.log("!!! db pool.getConnection failed!!");

        console.log("!!!", err);
        /*
        //기존에 쓰던 에러났을때의 커넥션 릴리즈. 이거 오류났었음
        if (pool._freeConnections.indexOf(connection) === -1) {
          connection.release();
        }
        */
       if (connection && pool&& pool._freeConnections.indexOf(connection) === -1 ) {
        connection.release();
      }
        return reject(err);
      }
      const sql = connection.query(query, params, function (err, result) {
        //console.log(query)
        connection.release();
        if (err) {
          console.log("!!! db connection.query failed!!");

          console.log("!!!", err);
          console.log(pool._freeConnections.indexOf(connection)); // -1
          if (connection && pool&& pool._freeConnections.indexOf(connection) === -1) {
            connection.release();
          }
          return reject(err);
        }
        return resolve(result);
      });
    });
  });
};