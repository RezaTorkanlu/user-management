'use client'
import RegisterFrom from "@/components/RegisterFrom"
import { useRouter } from "next/navigation"

const RegistePage = () => {
  const router = useRouter()

  const handleSubmit = async (): Promise<void> => {
    router.push('/')
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center my-10 font-bold text-xl">Register</h1>
      <RegisterFrom onSubmit={handleSubmit} />
    </div>
  )
}

export default RegistePage