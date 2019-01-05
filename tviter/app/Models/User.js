'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
    static boot () {
        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {
            if (userInstance.dirty.password) {
                userInstance.password = await Hash.make(userInstance.password)
            }
        })
    }

    /**
     * A relationship on tokens is required for auth to
     * work. Since features like `refreshTokens` or
     * `rememberToken` will be saved inside the
     * tokens table.
     *
     * @method tokens
     *
     * @return {Object}
     */
    tokens () {
        return this.hasMany('App/Models/Token')
    }

    /** 
     * The User and the Tweet have a one-to-many relationship
     */
    tweets () {
        return this.hasMany('App/Models/Tweet')
    }

    /**
     * A user can have many followers and the user can follow many users
     * This is a many-to-many relationship.
     */
    followers () {
        return this.belongsToMany(
            'App/Models/User', 
            'user_id',
            'follower_id'
        ).pivotTable('followers')
    }

    /**
     * The inverse relationship of the previous
     */
    following () {
        return this.belongsToMany(
            'App/Models/User',
            'follower_id',
            'user_id'
        ).pivotTable('followers')
    }

    /** 
     * The User and the Reply have a one-to-many relationship
     */
    replies () {
        return this.hasMany('App/Models/Reply')
    }

    /** 
     * The User and the Favorite have a one-to-many relationship
     */
    favorites () {
      return this.hasMany('App/Models/Favorite')
  }
}

module.exports = User
