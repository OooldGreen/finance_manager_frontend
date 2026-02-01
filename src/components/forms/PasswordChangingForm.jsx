import { useState } from "react"
import { passwordValidation } from "../../services/utils/userValidation"
import usersService from '../../services/users'
import Notification from "../Notification"

const PasswordChangingForm = ({showPasswordChangingForm, setShowPasswordChangingForm}) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const [hint, setHint] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setPasswordForm({...passwordForm, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)

    const passwordError = passwordValidation(passwordForm.newPassword, passwordForm.confirmNewPassword)
    if (passwordError) {
      setError(passwordError)
      setTimeout(() => {
        setError(null)
      }, 5000)
      return
    }

    try {
      const payload = {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }
      const response = await usersService.updatePassword(payload)
      if (response.status == 200 || response.status === 201) {
        setHint("Password successfully changed")
        setTimeout(() => {
            setHint(null)
        }, 5000)
      }
    } catch (err) {
        setError("Can not change password")
        setTimeout(() => {
            setError(null)
        }, 5000)
    }
  }

  const handleCancelPasswordChange = () => {
    setShowPasswordChangingForm(!showPasswordChangingForm)
  }

  return (
    <div>
      {error && <Notification message={error} type="error"></Notification>}
      {hint && <Notification message={hint} type="success"></Notification>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="sm:grid-cols-12 gap-2 sm:gap-6">
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">Change Password</label>
            <div className="mt-2">
              <input 
                type="password"
                name="currentPassword"
                onChange={handleChange}
                required
                placeholder="Enter current password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              ></input>
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                type="password"
                name="newPassword"
                onChange={handleChange}
                required
                placeholder="Enter new password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              ></input>
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                type="password"
                name="confirmNewPassword"
                onChange={handleChange}
                required
                placeholder="Confirm new password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              ></input>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-x-2">
            <button type="button" onClick={handleCancelPasswordChange} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              Cancel
            </button>
            <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PasswordChangingForm