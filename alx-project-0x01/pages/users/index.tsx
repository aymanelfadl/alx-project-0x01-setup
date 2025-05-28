import UserCard from "@/components/common/UserCard"
import Header from "@/components/layout/Header"
import { UserProps } from "@/interfaces";
import { useState } from "react"

const Users: React.FC<UserProps> = ({ users }) => {

  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  if (!users) return null;
  
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <main className="p-6 min-h-screen bg-gradient-to-tl to-blue-400 from-purple-950">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 items-start">
          {users.map(user => (
            <UserCard 
              key={user.id}
              user={user}
              expanded={expandedId === user.id}
              onToggle={() => setExpandedId(expandedId === user.id ? null : user.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  const users = await response.json()

  return {
    props: {
      users
    }
  }
}

export default Users;