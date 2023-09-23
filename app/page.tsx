import {UserButton} from '@clerk/nextjs'
export default function Home() {
  return (
    
    <div className="">
      <UserButton afterSignOutUrl='/' />
      <h1>for sign in http://localhost:3000/auth/user/sign-in</h1>
      <h1>for sign up http://localhost:3000/auth/user/sign-up</h1>
    </div>
  )
}
