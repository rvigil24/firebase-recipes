import { useState } from 'react'
import { loginUser, loginWithGoogle, logoutUser, sendPasswordResetEmail } from '../services/firebase/auth'

const LoginForm = ({ user }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await loginUser({ email, password })
            setEmail('')
            setPassword('')
        }
        catch (err) {
            if (err.code === 'auth/invalid-login-credentials') {
                alert('There is no user record corresponding to this identifier. The user may have been deleted')
            }
            else if (err.code === 'auth/wrong-password') {
                alert('Wrong password');
            } else {
                alert('Error')
            }
        }
    }

    const handleLogout = () => {
        logoutUser()
    }

    const handleSendResetPasswordEmail = async () => {
        if (!email) {
            return alert('Missing username')
        }
        try {
            await sendPasswordResetEmail(email)
            alert('sent the password reset email')
        }
        catch (err) {
            alert(err.message)
        }
    }

    const handleLoginWithGoogle = async () => {
        try {
            await loginWithGoogle()
        }
        catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className='login-form-container'>
            {
                user ? (<div
                    className='row'
                >
                    Welcome {user.email}
                    <button
                        className='primary-button'
                        type='button'
                        onClick={handleLogout}
                    >Logout</button>
                </div>) :
                    (<form
                        onSubmit={handleSubmit}
                        className='login-form'
                    >
                        <label htmlFor=""
                            className='input-label login-label'
                        >
                            Username (email):
                            <input
                                type='email'
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className='input-text'
                            />
                        </label>
                        <label htmlFor=""
                            className='input-label login-label'
                        >
                            Password:
                            <input
                                type='password'
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='input-text'
                            />
                        </label>
                        <div className="button-box">
                            <button className='primary-button'>Login</button>
                            <button
                                className='primary-button'
                                type='button'
                                onClick={handleSendResetPasswordEmail}
                            >Reset password</button>
                            <button className='primary-button'
                                onClick={handleLoginWithGoogle}
                            >Login with Google</button>
                        </div>
                    </form>)
            }
        </div>
    )
}

export default LoginForm
