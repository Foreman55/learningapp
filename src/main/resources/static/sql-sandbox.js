let db = null;

async function initSQL() {
    const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` });
    db = new SQL.Database();

    // Create users table
    db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT
        );
        INSERT INTO users VALUES
            (1, 'Alice', 'alice@example.com'),
            (2, 'Bob', 'bob@example.com'),
            (3, 'Charlie', 'charlie@example.com');
    `);

    // Create orders table
    db.run(`
        CREATE TABLE orders (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            product TEXT,
            amount REAL
        );
        INSERT INTO orders VALUES
            (1, 1, 'Book', 20.00),
            (2, 1, 'Pen', 2.00),
            (3, 2, 'Backpack', 45.00),
            (4, 3, 'Laptop', 900.00);
    `);
}

function runSQL() {
    const sql = document.getElementById("queryBox").value;
    try {
        const result = db.exec(sql);
        if (result.length === 0) {
            document.getElementById("queryResult").innerText = "✅ Query ran successfully (no rows returned).";
            return;
        }

        const cols = result[0].columns;
        const rows = result[0].values;
        let output = cols.join(" | ") + "\n";
        output += "-".repeat(output.length) + "\n";
        for (const row of rows) {
            output += row.join(" | ") + "\n";
        }
        document.getElementById("queryResult").innerText = output;
    } catch (e) {
        document.getElementById("queryResult").innerText = "❌ " + e.message;
    }
}

// Initialize SQL when page loads
document.addEventListener('DOMContentLoaded', initSQL);

