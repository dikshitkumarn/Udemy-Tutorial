import React from 'react'
import Link from 'next/link'
import Router from "next/router";

const homePage = () => (
    <div>
        <h1>This is Home Page</h1>
        <p><Link href="/auth" ><a>Go to Auth</a></Link></p>
        <button onClick={() => Router.push('/auth')} > Go to auth </button>
    </div>
)

export default homePage