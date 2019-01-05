'use strict'

const User = use('App/Models/User')

class UserController {
    async signup ({ request, auth, response }) {
        // get user data from signupform
        const userData = request.only(['name', 'username', 'email', 'password'])

        try {
            // save the user to database
            const user = await User.create(userData)

            // generate JWT for user
            const token = await auth.generate(user)

            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            return response.status(400).json({
                status: 'error',
                data: 'There was a problem trying to create the user! Please try again later!!'
            })
        }
    }

    async login ({ request, auth, response }) {
        try {
            // validate the user credentials and generate a JWT 
            const token = await auth.attempt(
                request.input('email'),
                request.input('password')
            )
    
            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            response.status(400).json({
                status: 'error',
                message: 'Invalid email || password'
            })
        }
    }
}

module.exports = UserController
