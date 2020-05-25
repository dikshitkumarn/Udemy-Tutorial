import React, { Component } from 'react'
import Link from 'next/link'
import Router from "next/router";

class HomePage extends Component {

    static getInitialProps(context) {
        console.log(context);
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({appName: 'Super App'})
            }, 1000)
        })
        // promise.then()
        return promise
    }

    render(){
        return(
            <div>
                <h1>This is Home Page of {this.props.appName}</h1>
                <p><Link href="/auth" ><a>Go to Auth</a></Link></p>
                <button onClick={() => Router.push('/auth')} > Go to auth </button>
            </div>
        )
    }
}
export default HomePage