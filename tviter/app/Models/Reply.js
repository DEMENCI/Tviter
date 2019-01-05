'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reply extends Model {

    /**
     * The Reply model belongs to a 
     * relationship with User model
     */
    user () {
        return this.belongsTo('App/Models/User')
    }

    /**
     * The Reply model belongs to a 
     * relationship with Tweet model
     */
    tweet () {
        return this.belongsTo('App/Models/Tweet')
    }
}

module.exports = Reply
