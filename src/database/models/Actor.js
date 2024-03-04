module.exports = (sequelize, DataTypes) => {
    const alias = "Actor";
    const cols = {
        id:{
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            unsigned : true,
            autoIncrement : true
        },
        first_name:{
            type : DataTypes.STRING(100),
            allowNull : false
        },
        last_name:{
            type : DataTypes.STRING(100),
            allowNull : false
        },
        rating:{
            type : DataTypes.DECIMAL(3,1)
        },
        favorite_movie_id:{
            type : DataTypes.INTEGER,
            unsigned : true
        }
    }
    const config = {
        tableName : "actors",
        timestamps : false,
    }

    const Actor = sequelize.define(alias, cols, config);

    Actor.associate = function(models) {
        Actor.belongsToMany(models.Actor,{
            as:"movies",
            through:"actor_movie",
            foreignKey:"actor_id",
            otherKey:"movie_id",
            timestamps: false
        })
    }

    return Actor;
}