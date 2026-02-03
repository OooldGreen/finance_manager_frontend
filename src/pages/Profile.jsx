import { useContext, useEffect, useState } from "react"
import { userAuth } from '../services/utils/userAuth'
import usersService from '../services/users'

import UserForm from "../components/forms/UserForm"
import AuthContext from "../components/context/AuthContext"
import Notification from "../components/Notification"
import { AvatarIcon, ArcIcon } from "../components/ui/Icon"
import { CloseButton } from "../components/ui/Button"

const Profile = () => {
  const { user } = userAuth()
  const { setUser } = useContext(AuthContext)

  const [userFormData, setUserFormData] = useState(null)
  const [error, setError] = useState(null)
  const [hint, setHint] = useState(null)

  useEffect(() => {
    const getUserData = async () => {
      if (user && user.id) {
        try {
          const response = await usersService.getUser(user.id)
          const userData = response.data
          setUserFormData({
            username: userData.username,
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
            dateOfBirth: userData?.dateOfBirth || '' 
          })
        } catch (err) {
          console.error("fail to get user's information", err)
        }
      }
    }
    getUserData();
  }, [user])

  if (!userFormData) {
    return <div>loading...</div>
  }

  const handleCancel = () => {
    setUserFormData({
      username: user.username,
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      dateOfBirth: user?.dateOfBirth || '' 
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (window.localStorage.getItem('loggedFinanceUser')) {
        const response = await usersService.updateUser(userFormData)
        if (response.status == 201 || response.status == 200) {
          setUser(response.data)
          setHint("Successfully update user profile")
          setTimeout(() => {
            setHint(null)
          }, 5000)
        }
      }
    } catch(err) {
      setError('An error occurred.')
      console.log(err)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const submitButton = (
    <>
      {/* button */}
      <div className="mt-5 flex justify-end gap-x-2">
        <button onClick={handleCancel} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
          Cancel
        </button>
        <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white  hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          Save
        </button>
      </div>
    </>
  )
  
  return (
    <div>
      {hint && <Notification message={hint} type="success"></Notification>}
      {error && <Notification message={error} type="error"></Notification>}
      <div id="hs-ai-modal" className="hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none bg-neutral-900/50" role="dialog" tabIndex="-1" aria-labelledby="hs-ai-modal-label">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 ease-out transition-all sm:max-w-lg sm:w-full sm:mx-auto mt-10">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl pointer-events-auto dark:bg-neutral-800">
            <div className="relative overflow-hidden min-h-32 bg-gray-900 text-center rounded-t-xl dark:bg-neutral-950">
              <div className="absolute top-2 end-2">
                <CloseButton />
              </div>

              <figure className="absolute inset-x-0 bottom-0 -mb-px">
                <ArcIcon/>
              </figure>
            </div>

            {/* avatar */}
            <div className="relative z-10 -mt-12">
              <span className="mx-auto flex justify-center items-center size-15.5 rounded-full border border-gray-200 bg-white text-gray-700 shadow-2xs dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                <AvatarIcon/>
              </span>
            </div>

            <div className="p-4 sm:p-7 overflow-y-auto">
              <div className="text-center">
                <h3 id="hs-ai-modal-label" className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  {user.username}
                </h3>
              </div>

              {/* user information */}
              <UserForm mode="profile" submitButton={submitButton} handleSubmit={handleSubmit} user={userFormData} setUser={setUserFormData} error={error}/>

              <div className="mt-5 sm:mt-10">
                {/* <p className="text-sm text-gray-500 dark:text-neutral-500">If you have any questions, please contact us at <a className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="#">example@site.com</a> or call at <a className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="tel:+1898345492">+1 898-34-5492</a></p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile