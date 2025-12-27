import { CheckCircle, LogOut } from 'lucide-react'

function Dashboard({ onLogout }) {
    const user = {
        name: 'John Doe',
        email: 'john.doe@company.com'
    }

    return (
        <div className="auth-container">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <div className="success-icon">
                        <CheckCircle size={48} />
                    </div>
                    <h1>Welcome to Dashboard</h1>
                    <p>You are successfully logged in!</p>
                </div>

                <div className="dashboard-content">
                    <div className="user-info">
                        <h3>Profile Information</h3>
                        <div className="info-item">
                            <strong>Name:</strong> {user.name}
                        </div>
                        <div className="info-item">
                            <strong>Email:</strong> {user.email}
                        </div>
                    </div>

                    <button onClick={onLogout} className="btn-logout">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard