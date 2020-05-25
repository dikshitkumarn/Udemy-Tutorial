import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

const error = () => (
    <div>
        <h1>404 error occured</h1>
        <p>Try <Link href="/" ><a>going back</a></Link></p>
    </div>
)

export default error