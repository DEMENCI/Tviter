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

Route.post('/signup', 'UserController.signup')

Route.post('/login', 'UserController.login')

Route.group(() => {
    Route.get('/profile_data', 'UserController.profileData')
    Route.post('/update_profile', 'UserController.updateProfile')
}).prefix('account')
  .middleware(['auth:jwt'])

Route.group(() => {
    Route.get('/users_to_follow', 'UserController.usersToFollow');
}).prefix('users')
  .middleware(['auth:jwt'])

Route.put('/change_password', 'UserController.changePassword')

Route.get(':username', 'UserController.showProfile')

Route.post('/follow/:id', 'UserController.follow')

Route.delete('/unfollow/:id', 'UserController.unFollow')

Route.get('/timeline', 'UserController.timeline')

