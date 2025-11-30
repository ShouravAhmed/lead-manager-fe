import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    getAllTeams, 
    verifyTeam, 
    unverifyTeam, 
    updateTeam, 
    deleteTeam,
    getAllUsers,
    updateUserRole,
    updateUser,
    deleteUser
} from "../services/adminService";
import { getUserDetails } from "../services/authService";
import { Team, User } from "../types";
import { FiCheck, FiX, FiEdit2, FiTrash2, FiSave, FiXCircle } from "react-icons/fi";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'teams' | 'users'>('teams');
    const [teams, setTeams] = useState<Team[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [editingTeam, setEditingTeam] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<string | null>(null);
    const [editingUserRole, setEditingUserRole] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const user = await getUserDetails();
                setCurrentUser(user);
                if (user.role !== 'admin' && user.role !== 'superAdmin') {
                    navigate('/dashboard');
                }
            } catch (error) {
                navigate('/login');
            }
        };
        checkAdmin();
    }, [navigate]);

    useEffect(() => {
        if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'superAdmin')) {
            loadData();
        }
    }, [currentUser, activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'teams') {
                const teamsData = await getAllTeams();
                setTeams(teamsData);
            } else {
                const usersData = await getAllUsers();
                setUsers(usersData);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyTeam = async (teamId: string) => {
        try {
            await verifyTeam(teamId);
            await loadData();
        } catch (error) {
            console.error('Error verifying team:', error);
            alert('Failed to verify team');
        }
    };

    const handleUnverifyTeam = async (teamId: string) => {
        try {
            await unverifyTeam(teamId);
            await loadData();
        } catch (error) {
            console.error('Error unverifying team:', error);
            alert('Failed to unverify team');
        }
    };

    const handleDeleteTeam = async (teamId: string) => {
        if (!confirm('Are you sure you want to delete this team?')) return;
        try {
            await deleteTeam(teamId);
            await loadData();
        } catch (error) {
            console.error('Error deleting team:', error);
            alert('Failed to delete team');
        }
    };

    const handleEditTeam = (team: Team) => {
        setEditingTeam(team._id!);
        setEditForm({ title: team.title, description: team.description });
    };

    const handleSaveTeam = async (teamId: string) => {
        try {
            await updateTeam(teamId, editForm);
            setEditingTeam(null);
            await loadData();
        } catch (error) {
            console.error('Error updating team:', error);
            alert('Failed to update team');
        }
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user._id!);
        setEditForm({ 
            fullName: user.fullName || '', 
            title: user.title || '', 
            bio: user.bio || '',
            phone: user.phone || '',
            email: user.email || '',
            username: user.username || ''
        });
    };

    const handleSaveUser = async (userId: string) => {
        try {
            await updateUser(userId, editForm);
            setEditingUser(null);
            await loadData();
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user');
        }
    };

    const handleUpdateUserRole = async (userId: string, role: 'user' | 'admin' | 'superAdmin') => {
        if (!currentUser || currentUser.role !== 'superAdmin') {
            alert('Only super admins can change user roles');
            return;
        }
        if (!confirm(`Are you sure you want to change this user's role to ${role}?`)) return;
        try {
            await updateUserRole(userId, role);
            setEditingUserRole(null);
            await loadData();
        } catch (error) {
            console.error('Error updating user role:', error);
            alert('Failed to update user role');
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await deleteUser(userId);
            await loadData();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Admin Dashboard</h1>
                
                {/* Tabs */}
                <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setActiveTab('teams')}
                        className={`px-4 py-2 font-medium ${
                            activeTab === 'teams'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                        Teams ({teams.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-2 font-medium ${
                            activeTab === 'users'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                        Users ({users.length})
                    </button>
                </div>

                {/* Teams Tab */}
                {activeTab === 'teams' && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Members</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {teams.map((team) => (
                                        <tr key={team._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingTeam === team._id ? (
                                                    <input
                                                        type="text"
                                                        value={editForm.title || ''}
                                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                        className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                                                    />
                                                ) : (
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{team.title}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingTeam === team._id ? (
                                                    <input
                                                        type="text"
                                                        value={editForm.description || ''}
                                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                                        className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                                                    />
                                                ) : (
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{team.description || '-'}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    (team.isVerified || team.isVarified)
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}>
                                                    {(team.isVerified || team.isVarified) ? 'Verified' : 'Unverified'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {team.members?.length || 0}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {editingTeam === team._id ? (
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleSaveTeam(team._id!)}
                                                            className="text-green-600 hover:text-green-900 dark:text-green-400"
                                                        >
                                                            <FiSave size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingTeam(null)}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400"
                                                        >
                                                            <FiXCircle size={18} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex space-x-2 items-center">
                                                        {(team.isVerified || team.isVarified) ? (
                                                            <button
                                                                onClick={() => handleUnverifyTeam(team._id!)}
                                                                className="flex items-center space-x-1 px-3 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900 dark:hover:bg-orange-800 dark:text-orange-200 rounded-md text-sm font-medium transition-colors"
                                                                title="Unverify Team"
                                                            >
                                                                <FiX size={16} />
                                                                <span>Unverify</span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleVerifyTeam(team._id!)}
                                                                className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-200 rounded-md text-sm font-medium transition-colors"
                                                                title="Verify Team"
                                                            >
                                                                <FiCheck size={16} />
                                                                <span>Verify</span>
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleEditTeam(team)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                                                            title="Edit"
                                                        >
                                                            <FiEdit2 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteTeam(team._id!)}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400"
                                                            title="Delete"
                                                        >
                                                            <FiTrash2 size={18} />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Username</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Full Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingUser === user._id ? (
                                                    <input
                                                        type="text"
                                                        value={editForm.username || ''}
                                                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                                        className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                                                    />
                                                ) : (
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingUser === user._id ? (
                                                    <input
                                                        type="email"
                                                        value={editForm.email || ''}
                                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                                        className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                                                    />
                                                ) : (
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingUser === user._id ? (
                                                    <input
                                                        type="text"
                                                        value={editForm.fullName || ''}
                                                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                                        className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                                                    />
                                                ) : (
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.fullName || '-'}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingUserRole === user._id && currentUser?.role === 'superAdmin' ? (
                                                    <select
                                                        value={user.role || 'user'}
                                                        onChange={(e) => handleUpdateUserRole(user._id!, e.target.value as 'user' | 'admin' | 'superAdmin')}
                                                        className="px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="superAdmin">Super Admin</option>
                                                    </select>
                                                ) : (
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            user.role === 'superAdmin' 
                                                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                                : user.role === 'admin'
                                                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                                        }`}>
                                                            {user.role || 'user'}
                                                        </span>
                                                        {currentUser?.role === 'superAdmin' && (
                                                            <button
                                                                onClick={() => setEditingUserRole(user._id!)}
                                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                                                                title="Change Role"
                                                            >
                                                                <FiEdit2 size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {editingUser === user._id ? (
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleSaveUser(user._id!)}
                                                            className="text-green-600 hover:text-green-900 dark:text-green-400"
                                                        >
                                                            <FiSave size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingUser(null)}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400"
                                                        >
                                                            <FiXCircle size={18} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex space-x-2">
                                                        {/* Only show edit/delete if user is regular user OR current user is superAdmin */}
                                                        {(user.role === 'user' || !user.role || currentUser?.role === 'superAdmin') && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleEditUser(user)}
                                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                                                                    title="Edit"
                                                                >
                                                                    <FiEdit2 size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteUser(user._id!)}
                                                                    className="text-red-600 hover:text-red-900 dark:text-red-400"
                                                                    title="Delete"
                                                                >
                                                                    <FiTrash2 size={18} />
                                                                </button>
                                                            </>
                                                        )}
                                                        {(user.role === 'admin' || user.role === 'superAdmin') && currentUser?.role !== 'superAdmin' && (
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                                                                Restricted
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;

