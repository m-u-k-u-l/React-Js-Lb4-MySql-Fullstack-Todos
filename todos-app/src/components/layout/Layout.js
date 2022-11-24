import React from "react"
import Header from "./../header/Header"
import Footer from "./../footer/Footer"
class Layout extends React.Component {
  render(){
    return (
      <>
        <Header />
        <main>{this.props.children}</main>
        <Footer />
      </>
    )
  }
}
export default Layout;