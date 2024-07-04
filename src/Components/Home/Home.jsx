const Home = ({userLogged}) => {
    return (
        <div>
            <p>Home</p>
            <p>Hello {userLogged.role}</p>
        </div>
    )
}

export default Home;