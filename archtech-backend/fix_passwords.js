const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function run() {
    try {
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'archtech_pro'
        });

        // Change tharindu's email to umesh
        await pool.query(
            "UPDATE users SET name='Umesh', email='umesh@archtechpro.com' WHERE email='tharindu@archtechpro.com'"
        );
        console.log("Email updated: tharindu@archtechpro.com -> umesh@archtechpro.com");

        // Set admin password
        const adminHash = await bcrypt.hash('admin123', 10);
        await pool.query("UPDATE users SET password_hash=? WHERE role='admin'", [adminHash]);
        console.log("Admin passwords updated.");

        // Set customer passwords
        const custHash = await bcrypt.hash('customer123', 10);
        await pool.query("UPDATE users SET password_hash=? WHERE role='customer'", [custHash]);
        console.log("Customer passwords updated.");

        console.log("All done!");
        process.exit(0);
    } catch (e) {
        console.error("ERROR:", e.message);
        process.exit(1);
    }
}
run();
