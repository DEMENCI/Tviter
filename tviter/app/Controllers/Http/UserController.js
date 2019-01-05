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

    async profileData ({ auth, response }) {
        const user = await User.query()
            .where('id', auth.current.user.id)
            .with('tweets', builder => {
                builder.with('user')
                builder.with('favorites')
                builder.with('replies')
            })
            .with('following')
            .with('followers')
            .with('favorites')
            .with('favorites.tweet', builder => {
                builder.with('user')
                builder.with('favorites')
                builder.with('replies')
            })
            .firstOrFail()
    
        return response.json({
            status: 'success',
            data: user
        })
    }

    async updateProfile ({ request, auth, response }) {
        try {
            // get currently authenticated user
            const user = auth.current.user
    
            // update with new data entered
            user.name = request.input('name')
            user.username = request.input('username')
            user.email = request.input('email')
            user.location = request.input('location')
            user.bio = request.input('bio')
            user.website_url = request.input('website_url')
    
            await user.save()
    
            return response.json({
                status: 'success',
                message: 'Profile updated!',
                data: user
            })
        } catch (error) {
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem updating profile, please try again later.'
            })
        }
    }
}

module.exports = UserController
