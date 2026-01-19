import sqlite3
import json

db_path = 'AJYALPRO_Backup_20260118_0015.db'

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Get all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print("Tables found:", [t[0] for t in tables])

    # Search for potential School Info tables
    school_info = {}
    keywords = ['School', 'Info', 'Config', 'Setting', 'Setup']
    
    for table_name in [t[0] for t in tables]:
        if any(k.lower() in table_name.lower() for k in keywords):
            print(f"\n--- Content of {table_name} ---")
            try:
                cursor.execute(f"SELECT * FROM {table_name} LIMIT 5")
                rows = cursor.fetchall()
                
                # Get column names
                cursor.execute(f"PRAGMA table_info({table_name})")
                columns = [col[1] for col in cursor.fetchall()]
                
                print(f"Columns: {columns}")
                for row in rows:
                    print(row)
            except Exception as e:
                print(f"Error reading {table_name}: {e}")

    conn.close()

except Exception as e:
    print(f"Database error: {e}")
