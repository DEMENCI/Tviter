'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { greeting: 'Hello world in JSON' }
})

/** 
 * UserController Routes
 */

Route.post('/signup', 'UserController.signup')

Route.post('/login', 'UserController.login')

Route.post('/follow/:id', 'UserController.follow')

Route.get(':username', 'UserController.showProfile')

Route.get('/timeline', 'UserController.timeline')

Route.put('/change_password', 'UserController.changePassword')

Route.delete('/unfollow/:id', 'UserController.unFollow')

Route.group(() => {
    Route.get('/profile_data', 'UserController.profileData')
    Route.post('/update_profile', 'UserController.updateProfile')
}).prefix('account')
  .middleware(['auth:jwt'])

Route.group(() => {
    Route.get('/users_to_follow', 'UserController.usersToFollow');
}).prefix('users')
  .middleware(['auth:jwt'])


/**
 * TweetController Routes
 */

Route.post('/tweet', 'TweetController.tweet').middleware(['auth:jwt'])
