
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-center h-screen w-full bg-">
            {children}
        </div>
    )
}

export default AuthLayout