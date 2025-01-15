const Navbar = ({connected, connect}) => {

  const ConnectWallet = async () => {
    if(!connected)
        connect();
  }

  return (
    <div className="bg-primary text-white flex justify-between border-b-2 p-2">
        <div className="ml-2 px-2 md:text-2xl">Todo List</div>
        <div className="header-btn text-sm  md:text-xl" onClick={ConnectWallet}>{connected ? "Wallet Connected":"Connect Wallet"}</div>
    </div>
  )
}

export default Navbar