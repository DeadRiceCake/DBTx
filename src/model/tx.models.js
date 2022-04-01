const db = require("../lib/database");
const db2 = require("../lib/database2"); // 동기형 DB pool

// 기존 DB 연결방식
exports.insert = function (num1) {
  let queryString = `
    INSERT INTO
      tx.tx1(tx1)
    VALUES
      (?)
      ;
  `;
return db.query(queryString, [num1]);
};

// transaction용 DB 연결방식
exports.useTransaction = async function (num1) {
  const conn = await db2.getConnection(); // DB 연결

  try {
    let queryString1 = `
      INSERT INTO
        tx1(tx1)
      VALUES
        (${num1})
    `;

    let queryString2 = `
      INSERT INTO
        tx2(tx2)
      VALUES
        (${num1})
    `;

    await conn.beginTransaction(); // 트랜잭션 적용 시작

    await conn.query(queryString1, []);
    await conn.query(queryString2, []);

    await conn.commit(); // 커밋

  } catch (err) {
    console.log(err);
    await conn.rollback(); // 에러시 롤백
    return err;
  } finally {
    conn.release(); // 작업 종료 후 DB 연결 종료
  }
};