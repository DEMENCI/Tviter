'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tweet extends Model {

    /**
     * The Tweet model belongs to a 
     * relationship with User model
     */
    user () {
        return this.belongsTo('App/Models/User')
    }

    /** 
     * The Tweet and the Reply have a one-to-many relationship
     */
    replies () {
        return this.hasMany('App/Models/Reply')
    }

    /** 
     * The Tweet and the Favourite have a one-to-many relationship
     */
    favorites () {
        return this.hasMany('App/Models/Favorite')
    }
}

module.exports = Tweet
