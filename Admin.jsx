import "./admin.scss"
import { useState, useEffect } from 'react';

export default function Login() {

    const [users, setUsers] = useState(null);
    const [logs, setLogs] = useState(null);

    useEffect(() => {
        getLogs();
        getData();

        async function getLogs() {
            const response = await fetch("https://adamstankovich.herokuapp.com/getlogs");
            const data = await response.json();
            setLogs(data);
        }

        async function getData() {
            const response = await fetch("https://adamstankovich.herokuapp.com/getmessages");
            const data = await response.json();
            setUsers(data);
        }
    }, []);

    return (
        <div className="admin" id="admin">
            <div className="left">
                <div className="messages">
                    <h1>Messages</h1>
                    {users && (
                        <div className="users">
                            {users.map((user) => (
                                <div >
                                    <p>{user.email}</p>
                                    <p>{user.message}</p>
                                </div>
                            ))}

                        </div>
                    )}
                </div>
            </div>
            <div className="right">
                <div className="logs">
                    <h1>Logs</h1>
                    {logs && (
                        <div className="logs">
                            {logs.map((log) => (
                                <div >
                                    <p>{log.useragent}</p>
                                    <p>{log.platform}</p>
                                    <p>{log.ip}</p>
                                    <p>{log.time}</p>
                                </div>
                            ))}

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}