import mysql from 'mysql2/promise' ;

const getConnection = async() => {
    const connection  = await mysql.createConnection({
        port : 3306 ,
        host : 'localhost' ,
        user : 'root' ,
        database : 'nodejs_sql' ,
        password : 'NHATBANG24112003@'
    })
    // console.log('ket noi database thanh cong')
    return connection ;
}

export default getConnection